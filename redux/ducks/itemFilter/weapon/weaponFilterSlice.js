import { createSlice } from '@reduxjs/toolkit'
import { damageType, tierType } from '../itemFilterSlice'
import { remove } from "lodash"

export const weaponSlotCategory = {
    kinetic: 2,
    energy: 3,
    power: 4,
}
const breakerType = { //breakerType
    none: 0,
    shieldpiercing: 1,
    disruption: 2,
    stagger: 3,
}
const ammunitionType = {//equipingBlock.ammoType
    None: 0,
    Primary: 1,
    Special: 2,
    Heavy: 3,
    Unknown: 4,
}
export const weaponTypeCategory = {
    AUTO_RIFLE: 5,
    HAND_CANNON: 6,
    PULSE_RIFLE: 7,
    SCOUT_RIFLE: 8,
    FUSION_RIFLE: 9,
    SNIPER_RIFLE: 10,
    SHOT_GUN: 11,
    MACHINE_GUN: 12,
    ROCKET_LAUNCHER: 13,
    SIDE_ARM: 14,
    BOW: 3317538576,
    SUBMACHINE_GUN: 3954685534,
    LINEAR_FUSION_RIFLE: 1504945536,
    SWORD: 54,
    TRACE_RIFLE: 2489664120,
    GRENADE_LAUNCHER: 153950757,
}
const InitialState = {    
    slot: [],
    type: [],
    tier: [],
    energy: [],
    ammo: [],
    damage: [],
    search: "",
}

const weaponFilterSlice = createSlice({
    name: 'weapon',
    initialState: InitialState,
    reducers: {
        toggleWeaponSlot(state, action) {
            if (!state.slot.includes(action.payload)) {
                state.slot.push(action.payload)
            }
            else {
                state.slot = remove(state.slot, hash => hash == action.payload)
            }
        },
        searchWeapons(state, action) {
            state.search = action.payload
        }
    }
})
export const { toggleWeaponSlot, searchWeapons } = itemsSlice.actions

export default itemsSlice.reducer

