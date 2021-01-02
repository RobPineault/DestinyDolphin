import { signInFirebaseTemplate, createFirebaseAccount, oauth2 } from '../../lib/auth/bungieAuthConfig'
import Cookies from 'cookies'

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
    }).then(results => {
        console.log('Auth code exchange result received:', results);
        const accessToken = results.token;
        const bungieUserID = accessToken.membership_id;
        //cookies.set('bungieToken', JSON.stringify(results.token), {
        //    maxAge: 7776000, httpOnly: true
        //})
        createFirebaseAccount(bungieUserID).then(firebaseToken => {
            res.send(signInFirebaseTemplate(firebaseToken, accessToken ));
        });
    }).catch(e => {
        console.log("sign in failed", e);
    })
}