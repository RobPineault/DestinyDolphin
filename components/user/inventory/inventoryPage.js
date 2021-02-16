import { Tabs, Tab, Button, Typography } from '@material-ui/core'
import { useEffect, useReducer } from 'react';
//import { getDefinitions } from '../../lib/destiny/bungieAPI/storage'
import { filter } from 'lodash'
import ItemDisplay from './ItemDisplay';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { profileRequest } from '../../../redux/ducks/user/userSlice'
const weaponFilter = {
    tabValue: 0,
    filterType: 'weapon',
    slot: [],
    type: [],
    tier: [],
    ammo: [],
    damage: [],
    search: "",
}
const armorFilter = {
    tabValue: 1,
    filterType: 'armor',
    type: [],
    class: [],
    tier: [],
    search: "",
}
const otherFilter = {
    tabValue: 2,
    filterType: 'other',
}
function setFilterState(tabValue) {
    switch (tabValue) {
        case 0:
            return weaponFilter
        case 1:
            return armorFilter
        case 2:
            return otherFilter
    }
}
const initialState = {
    tabValue: 0,
    filterType: 'weapon',
    filterState: weaponFilter,
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
        case 'tabClick':
            return setFilterState(action.payload);
        default:
            throw new Error();
    }
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>{children}</>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function inventory() {
    const [state, localDispatch] = useReducer(reducer, weaponFilter);
    const dispatch = useDispatch()
    console.log(state)
    //const inventory = useSelector(state => state.user.activeProfile.inventory.data)
    const { initialized, userInfo, inventory } = useSelector(
        (state) => {
            return {
                initialized: state.user.activeProfile.initialized,
                userInfo: state.user.activeProfile.profile.data.userInfo,
                inventory: state.user.activeProfile.inventory.data
            }
        },
        shallowEqual
    )

    useEffect(() => {
        if (initialized) {
            dispatch(profileRequest(userInfo, "inventory"))
        }        
    }, [initialized]);

    function toggle(category, value) {
        localDispatch({ type: 'toggle', payload: { filterCategory: category, filterValue: value } })
    }
    return (
        <>
            <Tabs value={state.tabValue} onChange={(e, v) =>localDispatch({ type: 'tabClick', payload: v })} aria-label="inventory section tabs" textColor='secondary'>
                <Tab label="Weapons" {...a11yProps(0)} />
                <Tab label="Armor" {...a11yProps(1)} />
                <Tab label="Other" {...a11yProps(2)} />
            </Tabs>
            <div className="big-space" />
            <TabPanel value={state.tabValue} index={0}>
                <p> weapon </p >
            </TabPanel>
            <TabPanel value={state.tabValue} index={1}>
                <p> armor </p >
            </TabPanel>
            <TabPanel value={state.tabValue} index={2}>
                <p> other </p >
            </TabPanel>
            {inventory ? <ItemDisplay state={state} inventory={inventory} /> : <p>loading</p>}            
        </>
    )
}
//<InventoryUI handleButton{...toggleFilter} handleClear={clearFilter} handleSearch={search}/>

// <weaponFilter onPress={toggle} state={state} />
// <armorFilter onPress={toggle} state={state} />
// <otherFilter onPress={toggle} state={state} />