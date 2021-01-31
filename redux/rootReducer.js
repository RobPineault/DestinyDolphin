import { combineReducers } from 'redux'
import sidebarReducer from './ducks/sidebar/sidebarSlice'
import userReducer from './ducks/user/userSlice'
//import { persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
//import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
/*
const rootPersistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: []
}

const userPersistConfig = {
    key: 'root',
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['signingIn']
}
*/
export default combineReducers({
    sidebar: sidebarReducer,
    user: userReducer,
})



/*
 * export default combineReducers({
    sidebar: sidebarReducer,
    user: persistReducer(userPersistConfig, userReducer),
})
 * 
const rootPersistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: []
}

const userPersistConfig = {
    key: 'root',
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    user: userReducer,
 })

export default persistReducer(userPersistConfig, rootReducer)
*/