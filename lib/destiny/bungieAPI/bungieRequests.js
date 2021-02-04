import axios from 'axios'
const qs = require('querystring');

export const baseRequest = axios.create({
    baseURL: 'https://www.bungie.net/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'X-API-KEY': '69bca91d818846da8aa22f7026df3dae'
    }
});

const platformRequest = axios.create({
    baseURL: 'https://www.bungie.net/Platform',
    headers: {
        'X-API-KEY': '69bca91d818846da8aa22f7026df3dae'
    }
});


export function standardRequest(path) {
    return platformRequest.get(path);
}

export async function authorizedRequest(path) {
    if (window.localStorage) {
        var token = JSON.parse(window.localStorage.getItem('bungieToken'));
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
            'X-API-KEY': '69bca91d818846da8aa22f7026df3dae'
        }
    });
    return bungieAuthRequest.get(path);
}


function updateToken(refreshToken) {
    const url = 'https://www.bungie.net/platform/app/oauth/token/';
    const requestBody = {
        client_id: 33560,
        grant_type: 'refresh_token',
        refresh_token: "" + refreshToken
    }
    const options = {
        headers: {
            'X-API-KEY': '69bca91d818846da8aa22f7026df3dae'
        }
    }
    return axios.post(url, qs.stringify(requestBody), options).then(res => {
        if (window.localStorage && res.token) {
            window.localStorage.removeItem('bungieToken');
            window.localStorage.setItem('bungieToken', JSON.stringify(res.token));
            console.log("successful update");
            return true;
        }
    }).catch(e => {
        window.localStorage.removeItem('bungieToken');
        return false;
        console.log("unsuccessful");
    })
}
