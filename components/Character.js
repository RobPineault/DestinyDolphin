import clsx from 'clsx';
import { Typography, Grid, GridItem } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { destinyClass, destinyRace } from '../lib/destiny/constants'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'


const path = 'https://www.bungie.net'
const useStyles = makeStyles({
    emblemBackground: emblemPath => ({
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: emblemPath ? "url(" + path + "" + emblemPath + ")" : 'none',
    }),
    characterCard: {
        position: 'relative',
    },
    charDetails: {
        marginLeft: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    charLight: {
        marginLeft: 'auto',
    }
});
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

export default function Character({ characterId }) {  
    let classType, raceType, light, emblemBackgroundPath = ''
    const initialized = useSelector(state => state.user.activeProfile.initialized)  
    const loading = useSelector(state => state.user.activeProfile.characters.loading)
    if (initialized) {
        const character = useSelector(state => state.user.activeProfile.characters.data[characterId])
        classType = getKeyByValue(destinyClass, character.classType)
        raceType = getKeyByValue(destinyRace, character.raceType)
        light = character.light
        emblemBackgroundPath = character.emblemBackgroundPath
    }
    //console.log(loading)
    const classes = useStyles(emblemBackgroundPath);

    return (
        <div className={classes.characterCard}>                        
            <div className="container-row">
                <div className={classes.charDetails}>
                    <Typography gutterBottom variant="h5">
                        {initialized ? classType : <Skeleton />}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        {initialized ? raceType : < Skeleton />}
                    </Typography>
                </div>
                <div>
                    <Typography variant="h4" color="textSecondary" className={classes.charLight}>
                        {initialized ? light : <Skeleton />}
                    </Typography>
                </div>
            </div>                                                                               
            </div> 
    );
}
//getKeyByValue(destinyClass, character.classType)
//getKeyByValue(destinyRace, character.raceType)