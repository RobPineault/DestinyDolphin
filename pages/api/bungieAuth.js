const crypto = require('crypto');
import { oauth2 } from '../../lib/auth/bungieAuthConfig'
import Cookies from 'cookies'

export default (req, res) => {
    var cookies = new Cookies(req, res)
    const state = cookies.get('state') || crypto.randomBytes(20).toString('hex');
    
    cookies.set('state', state, { maxAge: 360000 })
    const redirectUri = oauth2.authorizeURL({
        response_type: 'code',        
        state: state
    });
    res.redirect(redirectUri);
}