import { signInFirebaseTemplate, createFirebaseAccount, oauth2 } from '../../lib/auth/bungieAuthConfig'

export default (req, res) => {
    var cookies = new Cookies(req, res)
    if (!cookies.get('state')) {
        res.status(400).send('State cookie not set or expired. Maybe you took too long to authorize. Please try again.');
    } else if (cookies.get('state') !== req.query.state) {
        res.status(400).send('State validation failed');
    }
    const secret = process.env.BUNGIE_CLIENT_SECRET
    const clientId = process.env.BUNGIE_CLIENT_ID
    oauth2.getToken({
        code: req.query.code,
    }, {
            headers: {
            'Authorization': "Basic " + new Buffer.from(clientId + ":" + secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(accessToken => {
        res.send(createBody(JSON.stringify(accessToken.token), cookies.get('reqOrigin')))


        //cookies.set('token', accessToken.token)
        //res.redirect("308", cookies.get('reqOrigin'))
       // const admin = adminInit();
       // let firebaseUserRecord      

        /*
        admin.auth().getUser(accessToken.membership_id).then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            firebaseUserRecord = userRecord
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);            
            if (userRecord.displayName != accessToken.displayName) {
                admin.auth().updateUser({
                    uid: accessToken.membership_id,
                    displayName: accessToken.displayName
                }).then((userRecord) => firebaseUserRecord = userRecord)
            }
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                console.log('creating user')
                admin.auth().createUser({
                    uid: accessToken.membership_id,
                    displayName: accessToken.displayName
                })
            }
        })
        admin.auth().createCustomToken(uid).then(token => {
            console.log('Created Custom token for UID "', uid, '" Token:', token);
            return token
        }).catch(e => console.log('Failed to create token', e))
        //cookies.set('bungieToken', JSON.stringify(results.token), {
        //    maxAge: 7776000, httpOnly: true
        //})
        createFirebaseAccount(bungieUserID).then(firebaseToken => {
            res.send(signInFirebaseTemplate(firebaseToken, accessToken ));
        });*/
    }).catch(e => {
        console.log("sign in failed", e);
        res.status(400).send('failed to exchange code for access token');
    })
}

export function createBody(token, path) {
    return `    
    <script>
    if(window.localStorage){
        window.localStorage.setItem('bungieToken', ${token});  
    }
    window.location.replace("www.destinydolphin.com/${path}")
    </script>`
}