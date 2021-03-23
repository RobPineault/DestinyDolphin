import { useReducer } from 'react'
import { filter } from 'lodash'
import WeaponFilterInterface from './WeaponFilterInterface'
import ItemsDisplay from './ItemsDisplay'

const initialState = {
    slot: [],
    type: [],
    tier: [],
    ammo: [],
    damage: [],
    search: "",
}

function reducer(state, action) {     
    switch (action.type) {
        case 'toggle':
            let filterValue = action.payload.filterValue
            let filterCategory = action.payload.filterCategory
            let activeButtons = state[filterCategory]
            if (activeButtons.length == 0 || !activeButtons.includes(filterValue)) {
                return {
                    ...state,
                    [filterCategory]: [...activeButtons, filterValue]
                };
            }           
            return {
                ...state,
                [filterCategory]: filter(state[filterCategory], value => filterValue != value)
            };
        case 'search':
            return { ...state, search: action.payload };
        case 'clear':
            return initialState 
        default:
            throw new Error();
    }
}
const WeaponDB = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //console.log("rendered")

	return (
        <>
            <WeaponFilterInterface style="margin-bottom: 32px;" dispatch={dispatch} state={state} />
            <ItemsDisplay filterType="weapon" state={state} />            
        </>
		)
}

export default WeaponDB
