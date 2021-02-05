import { createSlice } from '@reduxjs/toolkit'
import { getProfiles, initProfile } from '../../../lib/destiny/bungieAPI/commonRequests'

const requestType = {
    membership: "membership",
    profile: "profile",
    characters: "characters",
}
let initialState = {}
if (typeof localStorage != 'undefined') {
    const token = JSON.parse(localStorage.getItem("bungieToken"))
    if (token) {
        initialState = {
            signedIn: true,           
            testToken: {
                membership_id: 19509215,
                membershipType: 3,
            },
            bungieToken: token,
            bungieProfile: {
                loading: false,
                error: null,
            },
            destinyProfiles: [],
            activeProfile: {  
                initialized: false,                
                profile: {
                    loading: false,
                    error: null,
                    data: {},
                },
                characters: { 
                    loading: false,
                    error: null,
                    activeCharacterId: {},
                    data: [],
                },
                inventory: {
                    loading: true,
                    error: null,
                    data: {},
                },
            },            
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
                    state.activeProfile.profile.loading = true;
                    state.activeProfile.characters.loading = true;
                    break;
            }
        },
        requestSuccess(state, { payload }) {
            switch (payload.type) {
                case "profiles":
                    state.bungieProfile = payload.res.bnetMembership;
                    state.destinyProfiles = payload.res.profiles;
                    state.bungieProfile.loading = false;
                    break;
                case "initActiveProfile":

                    state.activeProfile.profile.data = payload.res.profile.data;
                    state.activeProfile.characters.data = payload.res.profile.data.characterIds.map(charId => {
                        return payload.res.characters.data[charId]
                    })                
                    state.activeProfile.characters.activeCharacterId = payload.res.profile.data.characterIds[0]; 
                    state.activeProfile.characters.loading = false;
                    state.activeProfile.profile.loading = false;
                    if (!state.activeProfile.initialized) {
                        state.activeProfile.initialized = true;
                    }                                     
                    break;
                case "characters":
                    state.characters.data = payload.res;
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
            }
        },
        setActiveCharacter(state, { payload }) {
            switch (payload) {
                case "max":
                    state.bungieProfile.error = payload.err;
                    break;
                case "initActiveProfile":
                    state.activeProfile.error = payload.err;
                    break;
            }
        }
    }
})

export const { startRequest, requestSuccess, requestFailure } = userSlice.actions

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
                break
        }        
        dispatch(requestSuccess(payload))
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
 */
