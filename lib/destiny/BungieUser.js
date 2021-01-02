import { standardRequest } from './bungieAPI/utils'

export function initPlayer(id) {
    let user = { membership: null, characters: null}
    return getProfiles(id).then((membership) => {
        user.membership = membership;
        return getProfileData(membership);
    }).then((characters) => {
        user.characters = characters;
        return user;
    }); 
}
function getProfiles(id) {
     return standardRequest('/Destiny2/-1/Profile/' + id + '/LinkedProfiles/').then(res => {
         const profiles = res.data.Response.profiles;
         if (profiles.length == 1) {
             let profile = profiles[0];
             let membership = {
                 membershipId: profile.membershipId,
                 membershipType: profile.membershipType,
                 displayName: profile.displayName,
                 lastPlayed: profile.dateLastPlayed,
                 isPublic: profile.isPublic,
             }
             return membership
         }
         else {
             profiles.map(profile => {
                 if (profile.isCrossSavePrimary) {
                     let membership = {
                         membershipId: profile.membershipId,
                         membershipType: profile.membershipType,
                         displayName: profile.displayName,
                         lastPlayed: profile.dateLastPlayed,
                         isPublic: profile.isPublic,
                         isCrossSavePrimary: true,
                         applicableMembershipTypes: profile.applicableMembershipTypes,
                     }
                     return membership
                 }
             })
         }
    }).catch(e => console.log(e));    
}
function getProfileData(membership) {
     return standardRequest('Destiny2/' + membership.membershipType + '/Profile/' + membership.membershipId + '/?components=100,200').then(res => {
         const profileData = res.data.Response;
         const characterIds = profileData.profile.data.characterIds;
         const chars = profileData.characters.data;
         let characters = [];
         characterIds.map(id => {
             const char = chars[id];             
             characters.push({
                 characterId: id,                 
                 class: char.classType,
                 race: char.raceType,
                 gender: char.genderType,
                 emblem: {
                     emblemPath: char.emblemPath,
                     emblemBackgroundPath: char.emblemBackgroundPath,
                     emblemHash: char.emblemHash,
                     emblemColor: char.emblemColor
                 },
                 stats: char.stats,
                 light: char.light,
                 selected: false,
             })
         })
         if (characters.length > 1) {
             characters.sort((a, b) => { return b.light - a.light });
         }
         characters[0].selected = true;
         return characters
    }).catch(e => console.log(e));    
}