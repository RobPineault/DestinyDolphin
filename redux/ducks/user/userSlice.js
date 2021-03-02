import { createSlice } from '@reduxjs/toolkit'
import { getProfiles, initProfile, profileData, characterData } from '../../../lib/destiny/bungieAPI/commonRequests'
import { catigorizeCharacterItems } from '../../../lib/destiny/itemUtils'



let initialState = {}
/*
if (process.env.HOSTNAME == 'localhost') {
    import data from 'data/local/'
}*/
if (typeof localStorage != 'undefined') {
    const token = JSON.parse(localStorage.getItem("bungieToken"))
    if (token) {
        initialState = {
            signedIn: true,           
            bungieToken: token,
            bungieProfile: {
                loading: false,
            },
            destinyProfiles: [],
            activeProfile: {  
                initialized: false,
                loading: false,
                profile: {},
                characters: {},
            },
            inventory: {
                loading: false,
            }
        }
    }
    else {
        initialState = {
            signedIn: false,
        }
    }
}


const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        startRequest(state, { payload }) {
            switch (payload) {
                case "profiles":
                    state.bungieProfile.loading = true;
                    break;
                case "initActiveProfile":
                    state.activeProfile.loading = true;
                    break;
                case "inventory":
                    state.inventory.loading = true;
                    break;
            }
        },
        requestSuccess(state, { payload }) {
            const { type, res } = payload;
            switch (type) {
                case "profiles":
                    state.bungieProfile = res.bnetMembership;
                    state.destinyProfiles = res.profiles;
                    state.bungieProfile.loading = false;
                    break;
                case "initActiveProfile":
                    state.activeProfile.profile = res.profile.data;
                    state.activeProfile.activeCharacterId = res.profile.data.characterIds[0];
                    state.activeProfile.characters = res.characters.data;                               
                    state.activeProfile.loading = false;
                    if (!state.activeProfile.initialized) {
                        state.activeProfile.initialized = true;
                    }                                     
                    break;
                case "inventory":          
                    state.inventory.profile = res.profileInventory.data.items;
                    state.inventory.currency = res.profileCurrencies.data.items;
                    state.inventory.characters = catigorizeCharacterItems(
                        state.activeProfile.profile.characterIds,
                        res.characterInventories.data,
                        res.characterEquipment.data);
                    if (!state.inventory.itemComponents) {
                        state.inventory.itemComponents = {}}
                    state.inventory.itemComponents.sockets = res.itemComponents.sockets.data
                    state.inventory.profilePlugSets = res.profilePlugSets.data
                    state.inventory.loading = false;
                    break;
            }
        },
        requestFailure(state, { payload }) {
            switch (payload.type) {
                case "profiles":
                    state.bungieProfile.error = payload.err;
                    break;
                case "initActiveProfile":
                    state.activeProfile.error = payload.err;
                    break;
                case "inventory":
                    state.inventory.error = payload.err;
                    break;
            }
        },
        setActiveCharacter(state, { payload }) {
            state.activeProfile.characters.activeCharacterId = payload.characterId
        }
    }
})

export const { startRequest, requestSuccess, requestFailure, setActiveCharacter } = userSlice.actions

export default userSlice.reducer

export const initUser = (bnetToken) => async dispatch => { 
    let payload = {
        type: "profiles",
        res: null,
        err: null,
    }
    try {        
        dispatch(startRequest(payload.type))
        payload.res = await getProfiles(bnetToken.membership_id)
        //const membershipType = membership.profiles[0].membershipType        
        dispatch(requestSuccess(payload))
        dispatch(profileRequest(getPrimaryProfile(payload.res.profiles), "initActiveProfile"))        
    } catch (err) {
        payload.err = err.toString()
        dispatch(requestFailure(payload))
    }    
}

export const profileRequest = (profile, type) => async dispatch => {
    let payload = {
        type: type,
        res: null,
        err: null,
    }
    try {
        dispatch(startRequest(type))
        switch (type) {
            case "initActiveProfile":
                payload.res = await initProfile(profile.membershipType, profile.membershipId)                
                break
            case "inventory":
                payload.res = await profileData(profile.membershipType, profile.membershipId)
                break
        }        
        dispatch(requestSuccess(payload))
    } catch (err) {
        payload.err = err.toString()
        dispatch(requestFailure(payload))
    }
}
export const authorizedRequest = (path) => async dispatch => {
    // check for token
    // check expired
    // update if expired
    let payload = {
        type: "authRequest",
        res: null,
        err: null,
    }
    try {
        var token = JSON.parse(window.localStorage.getItem('bungieToken'));
    } catch (err) {
        payload.err = "token not found"
        dispatch(requestFailure(payload))
    }

    
    try {
        dispatch(startRequest(payload.type))
        payload.res = await getProfiles(bnetToken.membership_id)
        //const membershipType = membership.profiles[0].membershipType        
        dispatch(requestSuccess(payload))
        dispatch(profileRequest(getPrimaryProfile(payload.res.profiles), "initActiveProfile"))
    } catch (err) {
        payload.err = err.toString()
        dispatch(requestFailure(payload))
    }
}

function getPrimaryProfile(profiles) {
    if (profiles.length == 1) {
        return profiles[0]
    }
    else {
        profiles.forEach(profile => {
            if (profile.isCrossSavePrimary) {
                return profile
            }
        })
    }
}


/*
export const signInBungie = () => async dispatch => {
    try {
        dispatch(loadItemsStart())
        const items = await getDefinition(definition)
        dispatch(loadItemsSuccess(items))
    } catch (err) {
        dispatch(loadItemsFailure(err.toString()))
    }
}

 *     settings: {
    },
    membership: {
        isSignedIn: false,

    },
    characters: [{ characterhash: hash, isActive: false },
    ],

    logic for all characters selector
state.activeProfile.characters.data = payload.res.profile.data.characterIds.map(charId => {
                        return payload.res.characters.data[charId]
                    })

const requestType = {
    membership: "membership",
    profile: "profile",
    characters: "characters",
}
 */
