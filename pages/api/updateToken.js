import axios from 'axios'
const qs = require('querystring');

export default (req, res) => {
    const url = 'https://www.bungie.net/platform/app/oauth/token/';
    const clientId = process.env.BUNGIE_CLIENT_ID;
    const secret = process.env.BUNGIE_CLIENT_SECRET
    const requestBody = {
        grant_type: 'refresh_token',
        refresh_token: "" + req.body.refreshToken
    }
    const options = {
        headers: {
            'Authorization': "Basic " + new Buffer.from(clientId + ":" + secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    axios.post(url, qs.stringify(requestBody), options).then(response => {
        let token = response.data
        if (token.expires_at) {
            console.log("update with exires at")
        } else {
            console.log("update without exires at")
        }
        /*
        const now = new Date().getTime();
        token.expires_at = now + token.expires_in * 1000;        
        token.refresh_expires_at = now + token.refresh_expires_in * 1000;
        delete token.expires_in;
        delete token.refresh_expires_in;*/
        res.status(200).json({ token: token })
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    })
}
