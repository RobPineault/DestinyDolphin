import { Button, Grid, TextField, Paper, Typography } from '@material-ui/core';
import { armorType, tierType, destinyClass } from '../../lib/destiny/constants'
import FilterGroup from './FilterGroup'
//import styles from '../styles/Destiny.module.css'

export default function ArmorFilterInterface({ dispatch, state }) {   
    function toggle(category, value) {
        dispatch({ type: 'toggle', payload: { filterCategory: category, filterValue: value } })
    }
    return (
        <>
            <Grid component={Paper} container>
                <Grid item>
                    <Typography className="label-underline" variant="h6" color="textPrimary">
                        Class
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.class}
                        filterCategory="class"
                        filterEnum={destinyClass} />
                </Grid> 
                    <Grid item>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                            Slot
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.type}
                        filterCategory="type"
                        filterEnum={armorType} />
                    </Grid>                                   
                <Grid item>
                    <Typography className="label-underline" variant="h6" color="textPrimary">
                        Rarity
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.tier}
                        filterCategory="tier"
                        filterEnum={tierType}/>
                </Grid>
                <Grid spacing={2} container item xs={12}>
                    <Grid item xs={3}>
                        <Button onClick={() => dispatch({ type: 'clear' })}>Clear</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth={true}
                            margin="none"
                            id="search"
                            label="Search"
                            onChange={e => dispatch({ type: 'search', payload: e.target.value.toLowerCase() })} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
