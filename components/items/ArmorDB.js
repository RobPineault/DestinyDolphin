import { useReducer } from 'react'
import { filter } from 'lodash'
import ArmorFilterInterface from './ArmorFilterInterface'
import ItemsDisplay from './ItemsDisplay'

const initialState = {
    type: [],
    class: [],
    tier: [],
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
const ArmorDB = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //console.log("rendered")
    return (
        <>
            <ArmorFilterInterface dispatch={dispatch} state={state} />
            <ItemsDisplay filterType="armor" state={state} />
        </>
    )
}

export default ArmorDB
