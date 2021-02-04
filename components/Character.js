import clsx from 'clsx';
import { Typography, makeStyles } from "@material-ui/core"
import Skeleton from '@material-ui/lab/Skeleton';
import { destinyClass, destinyRace } from '../lib/destiny/constants'
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
const path = 'https://www.bungie.net'
const useStyles = makeStyles((theme) => ({
    emblemBackground: {
        backgroundImage: "url(" + path + "" + character.emblem.emblemBackgroundPath + ")",
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
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
        marginLeft: auto,
    }
}));

export default function Character({ loading, character }) {
    const classes = useStyles();
    return (
        <div className={classes.characterCard}>
            <div ClassName={clsx({[classes.emblemBackground]:loading})}/>
            <>
                <div className="container-row">
                    <div ClassName={classes.charDetails}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {loading ? <Skeleton /> : getKeyByValue(destinyClass, character.classType)}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                            {loading ? <Skeleton /> : getKeyByValue(destinyRace, character.raceType)}
                        </Typography>
                    </div>
                    <Typography variant="h4" color="textSecondary" component="h4" ClassName={classes.charLight}>
                        {loading ? <Skeleton /> : character.light}
                    </Typography>
                </div>                                                                 
              </>               
      </div>        
    );
}