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
    function getActiveCharacter() {
        return characters.data.find(character => { character.characterId == characters.activeCharacter })
    }
    let activeCharacter = initialized ? getActiveCharacter() : null
    let charLoading = characters.loading;
    useEffect(() => {
        if (!characters.loading) {
            activeCharacter = getActiveCharacter()
        }        
        charLoading = characters.loading;
    }, [characters.loading]);    
    return (
        <>
        <Character loading={charLoading}character={activeCharacter}/>
            </>
    );
}


