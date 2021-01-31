import { Membership } from './definitions'

export default class User {
    membership: Membership;
    inventory: Array<InventoryItem>

    constructor(membership: Membership) {
        this.membership = membership;
        Inventory = new Inventory(membership);
    }

    getInventory() {

    }

}