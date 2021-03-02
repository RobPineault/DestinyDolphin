import { Typography, Grid, GridItem } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { destinyClass, destinyRace } from '../lib/destiny/constants'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'

const path = 'https://www.bungie.net'
const useStyles = makeStyles({
    emblemBackground: data => ({
        width: 220,
        height: 56,
        backgroundImage: data.emblemPath ? `url(${path + "" + data.emblemPath})` : 'none',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
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
    //const initialized = useSelector(state => state.user.activeProfile.initialized)
    //const loading = useSelector(state => state.user.activeProfile.characters.loading)
    const character = useSelector(state => state.user.activeProfile.characters[characterId])
    if (character) {
        classType = getKeyByValue(destinyClass, character.classType)
        raceType = getKeyByValue(destinyRace, character.raceType)
        light = character.light
        emblemBackgroundPath = character.emblemBackgroundPath
    }
    const classes = useStyles({ emblemPath: emblemBackgroundPath });
    return (
        <div className={classes.emblemBackground}>
            <div className={classes.charDetails}>
                <Typography variant="h6">
                    {classType} 
                </Typography>
                <Typography variant="subtitle1">
                    {raceType}
                </Typography>
            </div>
            <Typography variant="h6" color="secondary" className={classes.charLight}>
                {light}
            </Typography>
        </div>
    );
}
//getKeyByValue(destinyClass, character.classType)<div className={classes.characterCard}>
//getKeyByValue(destinyRace, character.raceType)