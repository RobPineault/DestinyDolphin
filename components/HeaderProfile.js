import Character from './Character'
import { initUser } from '../redux/ducks/user/userSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useEffect } from 'react'
//import { createSelector } from '@reduxjs/toolkit'


export default function HeaderProfile() {
    const dispatch = useDispatch()
    const { bungieToken, initialized, activeCharacterId, profileLoading, profileError } = useSelector(
        (state) => {
            return {
                bungieToken: state.user.bungieToken,
                initialized: state.user.activeProfile.initialized,                
                activeCharacterId: state.user.activeProfile.characters.activeCharacterId,
                profileLoading: state.user.activeProfile.profile.loading,
                profileError: state.user.activeProfile.profile.error,
            }
        },
        shallowEqual
    )
    console.log(profileLoading)
    console.log(profileError)

    useEffect(() => {
        if (!initialized) {
            dispatch(initUser(bungieToken))
        }
    }, []);
    return (
            <Character character={activeCharacterId} />
    );
}


