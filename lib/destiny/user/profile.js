import { authorizedRequest } from './bungieAPI/bungieRequests'

function getProtectedProfile(membership, components) {
    return authorizedRequest('Destiny2/' + membership.membershipType + '/Profile/' + membership.membershipId + '/?components=' + components).then(res => {
        return res.data.Response;
    }).catch(e => console.log(e))
}

export async function getInventory(membership) {
    return await getProtectedProfile(membership, "102,201,205");
}
export async function getInventory(membership) {
    return await getProtectedProfile(membership, "102,205");
}
export async function getInventory(membership) {
    return await getProtectedProfile(membership, "102,205");
}

/*100,102,103,200,201,202,205,300,301,304,305,306,307,800,308,310,309,900,1100
 * Profiles,Characters,ProfileCurrencies,CharacterEquipment,CharacterInventories,
 * ItemObjectives,ItemInstances,ItemPerks,ItemStats,ItemSockets,ItemPlugStates,ItemTalentGrids,
 * ItemCommonData,ProfileInventories,ItemReusablePlugs,ItemPlugObjectives

100 Profiles 
102 profile inventories (material shared)
103 profile currencies

200 characters
201 character inventories (material not shared)
202 character progressions
205 character equipment

300 item instances
301 item objectives
302 item perks (active)
303 item render data
304 item stats
305 item sockets
306 item talent grids
307 item common data
308 item plug states
309 item plug objectives
310 item reusable plugs

800 collectibles
900 records (triumphs)
1100 metrics (stat trackers)

Site wide
100 200

Inventory
item sets 102 201 205 item details 300  
perks
Exotics
800

Triumps
900

Titles

Emblems


sockets slots (variables) weapons and armor have
plugs values of those variables.
*/