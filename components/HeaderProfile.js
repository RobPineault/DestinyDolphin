import Character from './Character'
import { initUser } from '../redux/ducks/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
export default function HeaderProfile() {
    const { bungieToken } = useSelector((state) => state.user)
    const { initialized, characters } = useSelector((state) => state.user.activeProfile)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!initialized) {
            dispatch(initUser(bungieToken))
        }
    }, []);
    const activeCharacter = initialized ? characters.data[characters.activeCharacter] : null
    const charLoading = characters.loading;
    useEffect(() => {
        if (!activeCharacter) {
            activeCharacter = initialized ? characters.data[characters.activeCharacter] : null
        }        
        charLoading = characters.loading;
    }, [characters.loading]);    
    return (
        <>
        <Character loading={charLoading}character={activeCharacter}/>
            </>
    );
}

