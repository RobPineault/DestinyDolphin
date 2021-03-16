import { authorizedRequest, definitionRequest, standardRequest } from './bungieRequests'

export function getDefinitionLinks() {
    return standardRequest('/Destiny2/Manifest/')
}
export function requestDefinition(def) {
    return getDefinitionLinks().then(res => {
        return definitionRequest(res.data.Response.jsonWorldComponentContentPaths.en['Destiny' + def + 'Definition'])
    }).then(res => {
        return res.data
    })
}
// linked profiles
export function getProfiles(membershipId) {
    return standardRequest('/Destiny2/-1/Profile/' + membershipId + '/LinkedProfiles/').then(res => {
        return res.data.Response;
    })
}
// profile components
function profileReq(userInfo, components, token) {
    return authorizedRequest('Destiny2/' + userInfo.membershipType + '/Profile/' + userInfo.membershipId + '/?components=' + components, token).then(res => {
        return res.data.Response;
    })
}

export function initProfile(userInfo, token) {
    return profileReq(userInfo, "100,200", token)
}

export function profileData(userInfo, token) {
    return profileReq(userInfo, "102,103,201,205,305", token)
}
export function characterData(userInfo, token) {
    return profileReq(userInfo, "201,205", token)
}