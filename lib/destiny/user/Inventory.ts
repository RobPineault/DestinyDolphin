import { authorizedRequest } from '../bungieAPI/bungieRequests'
import { Membership } from './definitions'

export default class Inventory {
    membership: Membership;
    updated: boolean;
    constructor(membership: Membership) {
        this.membership = membership;
    }    

    profileReq(membership: Membership, components) {
        return authorizedRequest('Destiny2/' + membership.membershipType + '/Profile/' + membership.membershipId + '/?components=' + components).then(res => {
            return res.data.Response;
        }).catch(e => console.log(e))
    }

    getInventory(membership) {
       // return await getProtectedProfile(membership, "102,201,205");
    }
    getInventory2(membership) {
        //return await getProtectedProfile(membership, "102,205");
    }
    getInventory3(membership) {
        //return await getProtectedProfile(membership, "102,205");
    }
}