import { Button, List, Grid, TextField, Paper, Typography } from '@material-ui/core';
import { weaponSlot, ammunitionType, damageType, tierType, weaponType } from '../../lib/destiny/constants'
import TypeFilter from './TypeFilter'
import FilterGroup from './FilterGroup'
//import styles from '../styles/Destiny.module.css'

export default function WeaponFilterInterface({ dispatch, state }) {   
    function toggle(category, value) {
        dispatch({ type: 'toggle', payload: { filterCategory: category, filterValue: value } })
    }
    return (
        <>
            <Grid component={Paper} container>
                    <Grid item>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                            Slot
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.slot}
                        filterCategory="slot"
                        filterEnum={weaponSlot} />
                    </Grid>
                    <Grid item>
                        <Typography className="label-underline" variant="h6" color="textPrimary">
                            Ammo
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.ammo}
                        filterCategory="ammo"
                        filterEnum={ammunitionType} />
                </Grid>                
                <Grid item>
                    <Typography className="label-underline" variant="h6" color="textPrimary">
                        Damage Type
                        </Typography>
                    <FilterGroup
                        toggle={toggle}
                        activeButtons={state.damage}
                        filterCategory="damage"
                        filterEnum={damageType}/>
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
                <Grid item>
                    <Typography className="label-underline" variant="h6" color="textPrimary">
                        Type
                        </Typography>
                    <List className='filter-list'>
                        <FilterGroup
                            toggle={toggle}
                            activeButtons={state.type}
                            filterCategory="type"
                            filterEnum={weaponType} />
                        </List>                    
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
