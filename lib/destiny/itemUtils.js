import { filter } from 'lodash'

export function filterByType(items, itemType) {
    return filter(items, item => item.itemType == itemType)
}

export function belongsToCategory(item, categories) {
    let belongs = false;
    categories.forEach(category => {
        if (item.itemCategoryHashes.includes(category)) {
            belongs = true
        }
    })
    return belongs
}
function isDamageType(item, damageTypes) {
    let belongs = false;
    damageTypes.forEach(damageType => {
        if (item.damageTypes.includes(damageType)) {
            belongs = true
        }
    })
    return belongs
}
function isAmmoType(item, ammoTypes) {
    return ammoTypes.includes(item.equippingBlock.ammoType)
}
function isTierType(item, tierTypes) {
    return tierTypes.includes(item.inventory.tierType)
}
function isClassType(item, classTypes) {
    return classTypes.includes(item.classType)
}
function isSearchMatch(item, searchValue) {
    let name = item.displayProperties.name.toLowerCase();
    return name.includes(searchValue)
}
export function filterArmor(state, armor) {
    return filter(armor, piece => {
        if (state.type.length > 0) {
            if (!belongsToCategory(piece, state.type)) {
                return false
            }
        }
        if (state.class.length > 0) {
            if (!isClassType(piece, state.class)) {
                return false
            }
        }
        if (state.tier.length > 0) {
            if (!isTierType(piece, state.tier)) {
                return false
            }
        }
        if (state.search.length > 0) {
            if (!isSearchMatch(piece, state.search)) {
                return false
            }
        }
        return true
    })
}
export function filterWeapons(state, weapons) {
    return filter(weapons, weapon => {
        if (state.slot.length > 0) {
            if (!belongsToCategory(weapon, state.slot)) {
                return false
            }
        }
        if (state.type.length > 0) {
            if (!belongsToCategory(weapon, state.type)) {
                return false
            }
        }
        if (state.tier.length > 0) {
            if (!isTierType(weapon, state.tier)) {
                return false
            }
        }
        if (state.ammo.length > 0) {
            if (!isAmmoType(weapon, state.ammo)) {
                return false
            }
        }
        if (state.damage.length > 0) {
            if (!isDamageType(weapon, state.damage)) {
                return false
            }
        }
        if (state.search.length > 0) {
            if (!isSearchMatch(weapon, state.search)) {
                return false
            }
        }
        return true
    })
}

export function catigorizeCharacterItems(charIds, inventory, equiped ) {
    const characterData = {}
    charIds.forEach(charId => {
        characterData[charId] = {
            equiped: equiped[charId].items,
            inventory: inventory[charId].items,
        }        
    })
    return characterData;
}