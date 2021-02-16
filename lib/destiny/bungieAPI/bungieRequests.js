import axios from 'axios'
const qs = require('querystring');
const key = process.env.NEXT_PUBLIC_BUNGIE_API_KEY
export const definitionRequest = axios.create({
    baseURL: 'https://www.bungie.net/',
    method: 'get',
    headers: {   
        'X-API-KEY': key
    }
});

const platformRequest = axios.create({
    baseURL: 'https://www.bungie.net/Platform',
    headers: {
        'X-API-KEY': key
    }
});

export function standardRequest(path) {
    return platformRequest.get(path);
}

export async function authorizedRequest(path) {
    try {
        var token = JSON.parse(window.localStorage.getItem('bungieToken'));
    } catch (err) {
        return "token not found"
    }
    const expires = new Date(token.expires_at).getTime();
    const now = new Date().getTime()
    if (expires < now) {
        console.log("updating token");
        updateToken(token.refresh_token).then(successful => {
            if (successful) {
                token = JSON.parse(window.localStorage.getItem('bungieToken'));
            }
            else {
                // sign out and alert user
                return null;
            }            
        })        
    }
    const bungieAuthRequest = axios.create({
        baseURL: 'https://www.bungie.net/Platform',
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'X-API-KEY': key
        }
    });
    return bungieAuthRequest.get(path);
}


function updateToken(refreshToken) {
    const url = '/api/updateToken';
    return axios.post(url, qs.stringify({refreshToken: "" + refreshToken})).then(res => {
        console.log(res)
        if (res.data.token) {
            window.localStorage.removeItem('bungieToken');
            window.localStorage.setItem('bungieToken', JSON.stringify(res.data.token));
            console.log("successful update");
            return true;
        }
    }).catch(e => {
        return false;        
    })
}
