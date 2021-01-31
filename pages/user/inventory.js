//import { getInventory } from '../../lib/destiny/profile'
import Layout from '../../components/Layout'
import Item from '../../components/Item'
import { Tabs, Tab, Button, Typography } from '@material-ui/core'
import { useUser } from '../../context/userContext'
import { useEffect, useState } from 'react';
import { getDefinitions } from '../../lib/destiny/bungieAPI/storage'
import { getItems } from '../../lib/destiny/user/itemUtils'
import { remove, slice } from 'lodash'
import axios from 'axios'
const pageSize = 20;

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
    const { user } = useUser();
    console.log(user);
    const [activeButtons, setActiveButtons] = useState({ bucket: [], slot: [], ammo: [] });
    const [allItems, setAllItems] = useState();    
    const [currentItems, setCurrentItems] = useState(null);
    const [page, setPage] = useState(1);
    //const [loaded, setLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    /*
    useEffect(() => {
        //if (user) {
            //const getInv = getInventory(user.membership)
            const getEquip = axios.get('/sampleEquipment.json'); 
            const getSocket = axios.get('/sampleSocket.json'); 
            const getCharPlug = axios.get('/sampleCharacterPlug.json');
            const getProfPlug = axios.get('/sampleProfilePlug.json'); 
            const getDefs = getDefinitions()
        Promise.all([getDefs, getEquip, getSocket, getCharPlug, getProfPlug ]).then((values) => {
                console.log(values[1]);
                console.log(values[2]);
                const equipment = values[1].data.characterEquipment.data['2305843009405057135'].items;
                const sockets = values[2].data.sockets.data;
            const charPlugs = values[3].data.characterPlugSets.data['2305843009405057135'].plugs;
            const profPlugs = values[4].data.profilePlugSets.data.plugs;
            const items = getItems(values[0], equipment, sockets, charPlugs, profPlugs);
                console.log(items)
                setAllItems(items);
            }).catch(e => console.log("get inventory failed", e));
        //}
    }, [user]);
    */
    function search(e) {
        setCurrentItems(filterItems(baseItems, e.target.value.toLowerCase(), activeButtons));
        setSearchValue(e.target.value);
    }
    function clearFilter() {
        setActiveButtons([{ hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }]);
    }
    function toggleFilter (group, hash) {
        let btns = [...activeButtons];
        if (activeButtons[group].hashes.includes(hash)) {
            console.log("removing: " + hash);
            btns[group].hashes = remove(btns[group].hashes, function (n) { return n != hash; });
            setCurrentItems(filterItems(baseItems, searchValue, btns));
            setActiveButtons(btns);
        }
        else {
            console.log("adding: " + hash);
            btns[group].hashes.push(hash);
            setCurrentItems(filterItems(baseItems, searchValue, btns));
            setActiveButtons(btns);
        }
    }
    function getBaseSet() {
        switch (activeTab) {
            case 0:
                return allItems.weapon
            case 1:
                return allItems.armor
            case 2:
                return allItems.ghost
        }
    }
    function getDisplayItems() {        
        return slice(getBaseSet(), (page - 1) * pageSize, page * pageSize);
    }

    return (
        <Layout title="Profile" description="User profile page">          
            <Tabs value={activeTab} onChange={handleChange} aria-label="inventory section tabs" textColor='secondary'>
                <Tab label="Weapons" {...a11yProps(0)} />
                <Tab label="Armor" {...a11yProps(1)} />
                <Tab label="Ghosts" {...a11yProps(2)} />
            </Tabs>
            <div className="big-space" />
            <TabPanel value={activeTab} index={0}>
                <div className="container-row">
                    <Button>inventory</Button>
                    <Button>vault</Button>
                    <Button></Button>
                </div>
            <div className="container">
            {allItems ? getDisplayItems().map((item,i) => {
                return (<Item key={i} item={item}/>)
            }) : (<p>loading</p>)}
                </div>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <div className="container">
                    {allItems ? getDisplayItems().map((item, i) => {
                        return (<Item key={i} item={item} />)
                    }) : (<p>loading</p>)}
                </div>
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <div className="container">
                    {allItems ? getDisplayItems().map((item, i) => {
                        return (<Item key={i} item={item} />)
                    }) : (<p>loading</p>)}
                </div>
      </TabPanel>
        </Layout>
    )
}
//<InventoryUI handleButton{...toggleFilter} handleClear={clearFilter} handleSearch={search}/>