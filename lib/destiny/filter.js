
import { filter, find, slice, uniqBy, isEqual, uniq, uniqWith } from "lodash"
import axios from 'axios'

export default class Index {
    constructor(filterType) {
        this.type = filterType;
        this.definitions = [];
        this.currentItems = [];
        this.baseItems = [];
        this.pageSize = 20;
        this.searchValue = null;
    }
    async init() {
        this.definitions = await getDefinitions();
        this.baseItems = this.baseQuery(this.type);
        this.currentItems = this.baseItems;
        let data = this.baseItems.map(item => {
            return { hash: item.hash, name: item.displayProperties.name }
        })        
        //storeData(data);
    }
    baseQuery(filterType) {
        switch (filterType) {
            case 'weapon':
                return this.multiFilterAllItems([2,3,4]);
                break;
            case 'armor':
                return this.multiFilterAllItems([45, 46, 47, 48, 49]);
                break;
            case 'armor mod':
                return this.multiFilterAllItems([4104513227]);
                break;
        }
    }
    setPageSize(n) {
        this.pageSize = n;
    }
    filterAny(hashes) {
        console.log(hashes);
        console.log(this.searchValue);
        this.currentItems = filter(this.baseItems, (item) => {
            if (this.searchValue) {
                let name = item.displayProperties.name.toLowerCase()
                if (!name.includes(this.searchValue)) {
                    return false
                }
            }
            var arr = item.itemCategoryHashes;
            arr.push(item.inventory.tierTypeHash);            
            if (arr != undefined) {
                var match = true;
                hashes.forEach(hashGroup => {
                    if (hashGroup.length != 0) {
                        var found = false;
                        if (hashGroup.length == 1) {
                            found = arr.includes(hashGroup[0]);
                        }
                        else {
                            hashGroup.forEach(n => {
                                if (arr.includes(n)) { found = true }
                            })
                        }
                        if (!found) { match = false; }
                    }
                })
                return match
            }
            return false;
        })
    }
    addFilter(hash) { 
        this.currentItems = this.currentItems.concat(this.filterBaseItems(hash));
    }
    removeFilter(hash) {         
        this.currentItems = this.filterCurrentItems(hash);
    }
    getCurrentItems(page) {
        var start = (page - 1) * this.pageSize
        var end = page * this.pageSize
        return slice(this.currentItems, start, end);
    }
    getCurrentItemsSize() {
        return this.currentItems.length;
    }
    clearFilters() {
        this.currentItems = this.baseItems;
    }
    filterBaseItems(hash) {
        return filter(this.baseItems, (item) => {
            var arr = item.itemCategoryHashes;
            if (arr != undefined) {
                return arr.includes(hash);
            }
            return false;
        })
    }
    filterCurrentItems(hash) {
        return filter(this.currentItems, (item) => {
            var arr = item.itemCategoryHashes;
            if (arr != undefined) {
                return arr.includes(hash);
            }
            return false;
        })
    }
    multiFilterAllItems(hashes) {
        return filter(this.definitions.InventoryItem, (item) => {
            var arr = item.itemCategoryHashes;
            if (arr != undefined && item.itemType != 20 && item.blacklisted != true) {
                var found = false;
                hashes.forEach(n => {
                    if (arr.includes(n)) { found = true }
                })
                return found
            }
            return false;
        })
    }
    checkDouplicate(set) {
        console.log('uniq', uniq(set));
        console.log('uniqby', uniqBy(set, 'displayProperties'));
        console.log('uniqwith', uniqWith(set, (a, b) => {
        return a.displayProperties.name == b.displayProperties.name;
        }));
    }
    search(input, btns) {
        this.searchValue = input;
        this.filterAny(btns);
    }
}


const storeData = (data) => {
    axios({
        method: 'post',
        url: '/api/saveData',
        data: data
    });
}
const weaponSlotCategoryHashes = {
    kinetic: 2,
    energy: 3,
    power: 4,
}
const weaponTypeCategoryHashes = {
    autoRifle: 5,
    handCannon: 6,
    pulseRifle: 7,
    scoutRifle: 8,
    fusionRifle: 9,
    sniperRifle: 10,
    shotgun: 11,
    machineGun: 12,
    rocketLauncher: 13,
    sidearm: 14,
}
const damageTypeHashes = {
    kinetic: 3373582085,
    arc: 2303181850,
    void: 3454344768,
    solar: 1847026933,
}
const rarityHashes = {
    common: 2395677314,
    rare: 2127292149,
    legendary: 4008398120,
    exotic: 2759499571,
}
const breakerHashes = {
    disruption: 2611060930,
    stagger: 3178805705,
    shieldPiercing: 485622768,
}


export async function loadDefs() {
        definitions = await getDefinitions();
}
function getItem(hash) {
    const id = hash >> 32;
    return definitions.InventoryItem[id];
}
function getBucket(hash) {
    const id = hash >> 32;
    return definitions.InventoryBucket[id];
}
export function getCategoryByName(name) {
    const catItem = find(definitions.ItemCategory, item => { return item.displayProperties.name == name });
    if (catItem == undefined) { return false }
    console.log(catItem);
    return {hash: catItem.hash, groupedCategoryHashes: catItem.groupedCategoryHashes,
        parentparentCategoryHashes: catItem.parentparentCategoryHashes }
}
export function filterItemByTier(hash) {
    const id = hash >> 32;
    return filter(definitions.InventoryItem, (item) => item.inventory.tierTypeHash == id);
}
export function filterItemByBucket(hash) {
    const id = hash >> 32;
    return filter(definitions.InventoryItem, (item) => item.inventory.bucketTypeHash == id);
}
