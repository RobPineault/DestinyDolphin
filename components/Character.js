import clsx from 'clsx';
import { Typography, Grid, GridItem } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { destinyClass, destinyRace } from '../lib/destiny/constants'
import { makeStyles } from '@material-ui/core/styles';
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
const path = 'https://www.bungie.net'
const useStyles = makeStyles({
    emblemBackground: props => ({
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: props.character ? "url(" + path + "" + props.character.emblemBackgroundPath + ")" : 'none',
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

export default function Character(props) {  
    const { loading, character } = props
    const classes = useStyles(props);
    const show = !loading && character;
    return (
        <div className={classes.characterCard}>                        
            <div className="container-row">
                <div className={classes.charDetails}>
                    <Typography gutterBottom variant="h5">
                        {show ? "hello" : <Skeleton />}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                        {show ? "sir" : < Skeleton />}
                    </Typography>
                </div>
                <div>
                    <Typography variant="h4" color="textSecondary" className={classes.charLight}>
                        {show ? character.light : <Skeleton />}
                    </Typography>
                </div>
            </div>                                                                               
            </div> 
    );
}
//getKeyByValue(destinyClass, character.classType)
//getKeyByValue(destinyRace, character.raceType)