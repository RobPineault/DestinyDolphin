import { oauth2 } from '../../lib/auth/bungieAuthConfig'
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
    }).then(accessToken => {
        let token = accessToken.token;
        //console.log(cookies.get('reqOrigin'));
        if (token.expires_at) {
            console.log("callback with exires at")
        } else {
            console.log("callback without exires at")
        }
            
        /*
        if (process.env.HOSTNAME == "localhost") {
            console.log("local");
            let token = accessToken.token;
            const now = new Date().getTime();
            token.expires_at = now + token.expires_in * 1000;
            token.refresh_expires_at = now + token.refresh_expires_in * 1000;
            delete token.expires_in;
            delete token.refresh_expires_in;
        }*/
        res.send(createBody(token, cookies.get('reqOrigin').toString()))
    }).catch(e => {
        console.log("sign in failed", e);
        res.status(400).send('failed to exchange code for access token');
    })
}
//${path}
function createBody(token, path) {
    return `    
    <script>
    if(window.localStorage){
        window.localStorage.setItem('bungieToken', '${JSON.stringify(token)}');  
    }
    window.location.replace('${path}')
    </script>`
}