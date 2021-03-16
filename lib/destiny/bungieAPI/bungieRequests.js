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

export async function authorizedRequest(path, token) {
    const bungieAuthRequest = axios.create({
        baseURL: 'https://www.bungie.net/Platform',
        headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'X-API-KEY': key
        }
    });
    return bungieAuthRequest.get(path);
}

export function updateToken(refreshToken) {
    const url = '/api/updateToken';
    return axios.post(url, qs.stringify({refreshToken: "" + refreshToken})).then(res => {
        const updatedToken = res.data.token;        
        if (updatedToken) {     
            //window.localStorage.removeItem('bungieToken');
            window.localStorage.setItem('bungieToken', JSON.stringify(updatedToken));
            console.log("successful update");
            return updatedToken;
        }
    }).catch(e => {
        return false;        
    })
}
