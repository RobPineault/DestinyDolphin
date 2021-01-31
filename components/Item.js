import React from 'react';
import { Card, Tooltip } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import ItemTooltip from './ItemTooltip'

import styles from '../styles/Destiny.module.css'
const path = 'https://www.bungie.net'

const ItemTooltip = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref}>
            {props.name}
    </div>
});

export default function Item({ item }) {
    return (
        <Card className={styles.item} raised={ true }>
            <CardMedia
                component="img"
                alt="item icon"
                className={styles.itemCardIcon}
                image={ path + item.displayProperties.icon }
                title={item.displayProperties.name}
            />
            <div className={'container-column'}>
                <CardContent className={ styles.itemContent }>                     
                    <Typography variant="h6" color="textPrimary" noWrap={ true}>
                        {item.displayProperties.name}
                    </Typography>
                    {item.itemType == 3 && item.instSockets ? (
                        <div className="container-row">
                            {item.instSockets.perks.map((perk, i) => {
                                perk = perk.active;
                                if (i < 4) {
                                    return (
                                        <div key={perk.displayProperties.name} className="perk">
                                            <Tooltip title={perk.displayProperties.name}>
                                                <img alt={perk.displayProperties.name} src={"https://www.bungie.net" + perk.displayProperties.icon} />                                                                                     
                                            </Tooltip>
                                        </div>
                                    )
                                }
                                })}
                        </div>
                    ): (<></>) }
                    
                </CardContent>
            </div>            
        </Card>
    );
}
/*
 * <Typography variant="subtitle2" color="textSecondary">
                        {item.displayProperties.description ? item.displayProperties.description : null }
                    </Typography>
 */