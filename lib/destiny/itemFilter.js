
import { filter } from "lodash"

export function getBaseItems(items, type) {
    switch (type) {
        case 'weapon':
            return multiFilterAllItems(items, [2, 3, 4]);
            break;
        case 'armor':
            return multiFilterAllItems(items, [45, 46, 47, 48, 49]);
            break;
        case 'armor mod':
            return multiFilterAllItems(items, [4104513227]);
            break;
    }
}

function multiFilterAllItems(items, hashes) {
    return filter(items, (item) => {
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
export function filterItems(baseItems, search, config) {
    return filter(baseItems, (item) => {
        if (search) {
            let name = item.displayProperties.name.toLowerCase();
            if (!name.includes(search)) {
                return false
            }
        }
        var properties = {
            category: item.itemCategoryHashes,
            tier: item.inventory.tierTypeHash,
            damageType: item.damageTypeHashes,
            ammoType: item.equippingBlock.ammoType,
        }
        //var arr = item.itemCategoryHashes;
       // arr.push(item.inventory.tierTypeHash);
        //item.damageTypeHashes.forEach(damageHash => { arr.push(damageHash) });
        //arr.push(item.equippingBlock.ammoType)
       let match = true;
        let i = 0;
            config.forEach(hashGroup => {
                if (hashGroup.hashes.length != 0) {
                    if (i == 0 || i == 1) {
                        let found = false;
                        hashGroup.hashes.forEach(n => {
                            if (properties.category.includes(n)) { found = true }
                        })
                        if (!found) { match = false; return}
                    }
                    if (i == 2) {
                        if (!hashGroup.hashes.includes(properties.tier)) { match = false; return}
                    }
                    if (i == 3) {
                        let found = false;
                        hashGroup.hashes.forEach(n => {
                            if (properties.damageType.includes(n)) { found = true }
                        })
                        if (!found) { match = false; return }
                    }
                    if (i == 4) {
                        if (!hashGroup.hashes.includes(properties.ammoType)) { match = false; return }
                    }
                }                
                i++;                
            })
        return match
    })
}
