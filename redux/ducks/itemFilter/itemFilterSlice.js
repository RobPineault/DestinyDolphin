import { createSlice } from '@reduxjs/toolkit'
import { getDefinition } from '../../lib/destiny/bungieAPI/storage'


export const weaponCategory = {
    PARENT: 1,
    KINETIC: 2,
    ENERGY: 3,
    POWER: 4,
}


const armorCategory = {
    PARENT: 20,
    HELMETS: 45,
    ARMS: 46,
    CHEST: 47,
    LEGS: 48,
    CLASS_ITEMS: 49,
}
const inventoryCategory = {
    emblems: 19,
    shaders: 41,
    ships: 42,
    sparrows: 43,
    currencies:18,
    Materials: 40,
    consumables: 35,
    subclasses: 50,
    mods: 56,
    clan_banner: 58,
    finishers: 1112488720,
}
export const damageType = { //damageTypes []
    none: 0,
    kinetic: 1,
    arc: 2,
    thermal: 3,
    void: 4,
    raid: 5,
    stasis: 6,
}
export const tierType = { //inventory.tierType
    unknown: 0,
    currency: 1,
    basic: 2,
    common: 3,
    rare: 4,
    superior: 5,
    exotic: 6,
}

const destinyClass = { //classType
    Titan: 0,
    Hunter: 1,
    Warlock: 2,
    Unknown: 3,
}
//bucket
const WeaponFilters = {
    
}

const parentFilter = {
    weapons: weaponCategory.PARENT,
    armor: armorCategory.PARENT,
    search: "",
}
// Control top categories
const itemFilter = createSlice({
    name: 'parentFilter',
    initialState: parentFilter.weapons,
    reducers: {
        setParentCategory(state, action) {
            return action.payload
        }
    }
})
export const { setParentCategory } = itemFilterSlice.actions

export default itemFilterSlice.reducer
