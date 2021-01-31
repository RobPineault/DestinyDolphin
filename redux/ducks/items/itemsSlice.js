import { createSlice } from '@reduxjs/toolkit'
import { getDefinition } from '../../lib/destiny/bungieAPI/storage'

const itemsInitialState = {
    itemsByHash: {},
    currentPageItems: [],
    page: null,
    pageCount: 0,
    isLoading: false,
    error: null
}

function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
}

const itemsSlice = createSlice({
    name: 'items',
    initialState: itemsInitialState,
    reducers: {
        loadItemsStart: startLoading,
        loadItemsSuccess(state, { payload }) {
            const items = payload
            state.isLoading = false
            state.error = null
            items.forEach(item => {
                state.itemsByHash[item.hash] = item
            })
            state.currentPageItems = items.map(item => item.hash)
        },
        loadItemsFailure: loadingFailed,
    }
})
export const { loadItemsStart, loadItemsSuccess, loadItemsFailure  } = itemsSlice.actions

export default itemsSlice.reducer

export const loadItems = () => async dispatch => {
    try {
        dispatch(loadItemsStart())
        const items = await getDefinition(definition)
        dispatch(loadItemsSuccess(items))
    } catch (err) {
        dispatch(loadItemsFailure(err.toString()))
    }
}