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
        res.status(200).json({ token: response.data })
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    })
}
