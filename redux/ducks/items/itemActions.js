function startLoading(state) {
    state.isLoading = true
}

function loadingFailed(state, action) {
    state.isLoading = false
    state.error = action.payload
}

export const loadStaticItems = () => async dispatch => {
    try {
        dispatch(loadItemsStart())
        const items = await getDefinition(definition)
        dispatch(loadItemsSuccess(items))
    } catch (err) {
        dispatch(loadItemsFailure(err.toString()))
    }
}

/*
 * Item request with components ItemInstances: 300
 * profile inventory (vault, materials?) component 102
 * character inventory component 201
 * character equiped component 205
 * get definitions
 * evaluate and combine item data
 * filter items by type and dispatch(load[itemType]Success)
 * 
 * 
 * 
 * /