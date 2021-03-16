import Character from './Character'
import { initUser, setActiveCharacter, profileRequest } from '../redux/ducks/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FormControl, Select, MenuItem, InputBase } from '@material-ui/core'
//import { createSelector } from '@reduxjs/toolkit'


export default function HeaderProfile() {
    const dispatch = useDispatch()
    const initialized = useSelector((state) => state.user.activeProfile.initialized)
    const characterIds = useSelector(state => state.user.activeProfile.profile.characterIds)
    const activeCharacterId = useSelector(state => state.user.activeProfile.activeCharacterId)

    useEffect(() => {
        if (!initialized) {
            dispatch(initUser())
        }
    }, [initialized]);
    
    const handleChange = (event) => {
        dispatch(setActiveCharacter({characterId: event.target.value}))
        console.log("char set to" + event.target.value)
    };
    return (
        <>
            { initialized ? (
                <FormControl  >
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={activeCharacterId}
                        onChange={handleChange}
                        variant="outlined"
                        input={<InputBase style={{ padding: 0 }} />}
                    >
                        {characterIds.map(charId => (
                            <MenuItem key={"char-menu-" + charId} value={charId} style={{ padding: '5px' }}>
                                <Character characterId={charId} />
                            </MenuItem>
                        )
                        )}
                    </Select>
                    </FormControl>
            ) : (
                    <p>Loading</p>
                )}
        </>);
}


