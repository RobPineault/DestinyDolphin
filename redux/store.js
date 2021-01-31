import { useMemo } from 'react'
import { configureStore } from '@reduxjs/toolkit'


import rootReducer from './rootReducer'

let store
const initialState = {  
}

function initStore(preloadedState = initialState) {
    return configureStore({
        reducer: rootReducer,
        preloadedState: preloadedState,        
    })
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

/*
 * middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
 * 
 * */