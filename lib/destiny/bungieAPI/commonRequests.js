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
export function getProfiles(membershipId) {
    return standardRequest('/Destiny2/-1/Profile/' + membershipId + '/LinkedProfiles/').then(res => {
        return res.data.Response;
    })
}

function profileReq(membershipType, membershipId, components) {
    return authorizedRequest('Destiny2/' + membershipType + '/Profile/' + membershipId + '/?components=' + components).then(res => {
        return res.data.Response;
    })
}

export function initProfile(membershipType, membershipId) {
    return profileReq(membershipType, membershipId, "100,200")
}

export function profileData(membershipType, membershipId) {
    return profileReq(membershipType, membershipId, "102,103,201,205,305")
}
export function characterData(membershipType, membershipId) {
    return profileReq(membershipType, membershipId, "201,205")
}