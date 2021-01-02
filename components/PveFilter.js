import { useState, useEffect } from 'react'
import { initFilter, getCurrentSetSize, getCurrentSet, filterPve } from '../lib/destiny/pveFilter'
import { Button, ButtonGroup, Grid, AppBar, } from '@material-ui/core';
import ItemTable from './ItemTable'
import styles from '../styles/Destiny.module.css'
import { remove } from 'lodash'


export default function PveFilter() {
    const [activeButtons, setActiveButtons] = useState(null);
    const [page, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        initFilter().then(() => {
            setLoaded(true);
        });
    }, []);

    
    const toggleFilter = (group, hash) => {
        if (activeButtons == null) {
            const btns = [{ hashes: [] }, { hashes: []}];
            btns[group].hashes.push(hash);
            console.log(btns);
            filterPve(btns);
            setActiveButtons(btns);
        }
        else {
            const btns = [...activeButtons];
            if (activeButtons[group].hashes.includes(hash)) {
                console.log("removing: " + hash);
                btns[group].hashes = remove(btns[group].hashes, function (n) { return n != hash; }); 
                console.log(btns);
                filterPve(btns);
                setActiveButtons(btns);  
            }
            else {
                console.log("adding: " + hash);
                btns[group].hashes.push(hash);
                console.log(btns);
                filterPve(btns);
                setActiveButtons(btns);
            }
        }
    }
    function isActive(group, hash) {       
        if (activeButtons != null) {
                return (activeButtons[group].hashes.includes(hash) ? 'active' : ''); 
        }
        else {
            return ''
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <ButtonGroup
                            color="secondary"
                            aria-label=" button group"
                            variant="text">
                            <Button className={isActive(0, 1)} onClick={() => toggleFilter(0, 1)}>Adventure</Button>
                            <Button className={isActive(0, 2)} onClick={() => toggleFilter(0, 2)}>Strike</Button>
                            <Button className={isActive(0, 3)} onClick={() => toggleFilter(0, 3)}>Raid</Button>
                            <Button className={isActive(0, 4)} onClick={() => toggleFilter(0, 4)}>Lost Sector</Button>
                        </ButtonGroup>
                    </AppBar>
                    </Grid>
                
                <Grid item xs="auto">
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical contained primary button group"
                        variant="contained"
                        size="small">
                        <Button className={isActive(1, 1199524104)} onClick={() => toggleFilter(1, 1199524104)}>Earth</Button>
                        <Button className={isActive(1, 359854275)} onClick={() => toggleFilter(1, 359854275)}>tangled shore</Button>
                        <Button className={isActive(1, 333456177)} onClick={() => toggleFilter(1, 333456177)}>the last city</Button>
                        <Button className={isActive(1, 308080871)} onClick={() => toggleFilter(1, 308080871)}>Mars</Button>
                        <Button className={isActive(1, 290444260)} onClick={() => toggleFilter(1, 290444260)}>Moon</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs="auto">
                    <p>number of items {loaded ? getCurrentSetSize(): ''}</p>
                </Grid>
            </Grid> 
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <p>activities</p>
                </Grid>
            </Grid>
        </>
    );
}

 //{display.map((item) => {
                //    return <Item key={item.index.toString()} item={item} />
                //})}

//<div className={styles.itemContainer}>
//    {loaded ? (<ItemTable items={getCurrentSet(page)} />) : (<div>loading</div >)}

//</div>