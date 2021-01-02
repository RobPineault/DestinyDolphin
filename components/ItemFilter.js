import { useState, useEffect } from 'react'
import { filterItems, getBaseItems } from '../lib/destiny/itemFilter'
import { Button, ButtonGroup, Grid, TextField, Paper, Typography } from '@material-ui/core';
import { getDefinitions } from '../lib/destiny/bungieAPI/definitions'
import ItemTable from './ItemTable'
import styles from '../styles/Destiny.module.css'
import { remove, slice } from 'lodash'
const pageSize = 20;

export default function Filter({ type }) {
    const [activeButtons, setActiveButtons] = useState([{ hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }]);
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [baseItems, setBaseItems] = useState(null);
    const [currentItems, setCurrentItems] = useState(null);

    useEffect(() => {
        getDefinitions().then(definitions => {
            if (definitions) {
                let BI = getBaseItems(definitions.InventoryItem, type);
                setBaseItems(BI);
                setCurrentItems(BI);
            }
            else {
                console.log("no defs")
            }
        }).catch(e => console.log(e));
    },[]);
    function getDisplayItems() {
        return slice(currentItems, (page - 1) * pageSize, page * pageSize);
    }
    function handleSearch(e) {
        setCurrentItems(filterItems(baseItems, e.target.value.toLowerCase(), activeButtons));
        setSearchValue(e.target.value);
    }
    function clearFilter() {
        setActiveButtons([{ hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }, { hashes: [] }]);
    }
    const toggleFilter = (group, hash) => {
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

    function isActive(group, hash) {
        if (activeButtons[group].hashes.length != 0) {
            return (activeButtons[group].hashes.includes(hash) ? 'active' : '');
        }
        else {
            return ''
        }
    }


    return (
        <>
            <Grid component={Paper} container>                
                <Grid container={true} item xs={ 3}>
                    <Grid item xs={6}>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                           Slot
                        </Typography>
                        <Button fullWidth={true} className={isActive(0, 2)} onClick={() => toggleFilter(0, 2)}>Kinetic</Button>
                        <Button fullWidth={true} className={isActive(0, 3)} onClick={() => toggleFilter(0, 3)}>Energy</Button>
                        <Button fullWidth={true} className={isActive(0, 4)} onClick={() => toggleFilter(0, 4)}>Power</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                            Ammo
                        </Typography>
                            <Button fullWidth={true} className={isActive(4, 1)} onClick={() => toggleFilter(4, 1)}>Primary</Button>
                            <Button fullWidth={true} className={isActive(4, 2)} onClick={() => toggleFilter(4, 2)}>Special</Button>
                            <Button fullWidth={true} className={isActive(4, 3)} onClick={() => toggleFilter(4, 3)}>Heavy</Button>
                    </Grid>

                </Grid>
                <Grid  container item xs={7 }>
                    <Grid item xs={12}>
                        <ButtonGroup
                            orientation="horizontal"
                            fullWidth={true}
                            aria-label="vertical contained primary button group"
                            variant="text"
                            size="small">
                            <Button className={isActive(3, 2303181850)} onClick={() => toggleFilter(3, 2303181850)}>Arc</Button>
                            <Button className={isActive(3, 3454344768)} onClick={() => toggleFilter(3, 3454344768)}>Void</Button>
                            <Button className={isActive(3, 1847026933)} onClick={() => toggleFilter(3, 1847026933)}>Solar</Button>
                            <Button disabled className={isActive(3, 2759499571)} onClick={() => toggleFilter(3, 2759499571)}>Stasis</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={3}>
                            <ButtonGroup
                                orientation="vertical"
                                fullWidth={true}
                                aria-label="vertical contained primary button group"
                          
                                size="small">
                                <Button className={isActive(1, 5)} onClick={() => toggleFilter(1, 5)}>Auto rifle</Button>
                                <Button className={isActive(1, 6)} onClick={() => toggleFilter(1, 6)}>Hand cannon</Button>
                                <Button className={isActive(1, 7)} onClick={() => toggleFilter(1, 7)}>Pulse rifle</Button>
                                <Button className={isActive(1, 8)} onClick={() => toggleFilter(1, 8)}>Scout rifle</Button>                                
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonGroup
                                orientation="vertical"
                                fullWidth={true}
                                aria-label="vertical contained primary button group"
                           
                                size="small">
                                <Button className={isActive(1, 9)} onClick={() => toggleFilter(1, 9)}>Fusion Rife</Button>
                                <Button className={isActive(1, 10)} onClick={() => toggleFilter(1, 10)}>Sinper Rifle</Button>
                                <Button className={isActive(1, 11)} onClick={() => toggleFilter(1, 11)}>Shotgun</Button>
                                <Button className={isActive(1, 14)} onClick={() => toggleFilter(1, 14)}>Siderarm</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonGroup
                                orientation="vertical"
                                fullWidth={true}
                                aria-label="vertical contained primary button group"
                              
                                size="small">
                                <Button className={isActive(1, 3317538576)} onClick={() => toggleFilter(1, 3317538576)}>Bow</Button>
                                <Button className={isActive(1, 3954685534)} onClick={() => toggleFilter(1, 3954685534)}>Submachine Gun</Button>
                                <Button className={isActive(1, 12)} onClick={() => toggleFilter(1, 12)}>Machine Gun</Button>
                                <Button className={isActive(1, 13)} onClick={() => toggleFilter(1, 13)}>Rocket Launcher</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <ButtonGroup
                                orientation="vertical"
                                fullWidth={true}
                                aria-label="vertical contained primary button group"
                               
                                size="small">
                                <Button className={isActive(1, 1504945536)} onClick={() => toggleFilter(1, 1504945536)}>Linear Fusion Rifles</Button>
                                <Button className={isActive(1, 54)} onClick={() => toggleFilter(1, 54)}>Sword</Button>
                                <Button className={isActive(1, 2489664120)} onClick={() => toggleFilter(1, 2489664120)}>Trace Rifle</Button>
                                <Button className={isActive(1, 153950757)} onClick={() => toggleFilter(1, 153950757)}>Grenade Launchers</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>                
                <Grid container item xs={ 2}>
                    <Grid item xs={12}>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                            Rarity
                        </Typography>
                            <Button fullWidth={true} className={isActive(2, 2759499571)} onClick={() => toggleFilter(2, 2759499571)}>Exotic</Button>
                            <Button fullWidth={true} className={isActive(2, 4008398120)} onClick={() => toggleFilter(2, 4008398120)}>Legendary</Button>
                            <Button fullWidth={true} className={isActive(2, 2127292149)} onClick={() => toggleFilter(2, 2127292149)}>Rare</Button>
                            <Button fullWidth={true} className={isActive(2, 2395677314)} onClick={() => toggleFilter(2, 2395677314)}>Common</Button>
                            <Button fullWidth={true} className={isActive(2, 3340296461)} onClick={() => toggleFilter(2, 3340296461)}>Basic</Button>                                                        
                    </Grid>
                </Grid>
                <Grid spacing={2} container item xs={12}>
                    <Grid item xs={3}>
                        <Button onClick={() => clearFilter()}>Clear</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth={ true} margin="none" id="search" label="Search" onChange={handleSearch} />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h5" color="textPrimary">
                            Results: 
                        {currentItems ? " " + currentItems.length : ""}
                        </Typography>
                    </Grid>
                </Grid>
               
            </Grid> 
            <div className="space"></div>
            <Grid>
                <Grid item xs={ 12}>
            <div className={styles.itemContainer}>
                {currentItems ? (<ItemTable items={getDisplayItems()} />) : (<div>loading</div >)}            
               
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

 //{display.map((item) => {
                //    return <Item key={item.index.toString()} item={item} />
                //})}