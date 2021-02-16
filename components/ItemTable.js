import styles from '../styles/Destiny.module.css'
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const path = 'https://www.bungie.net'
const damageTypes = {
    1: 'Kinetic',
    2: 'Arc',
    3: 'Solar',
    4: 'Void',
}
export default function ItemTable({ items, itemType }) {
    return (
        <>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Slot</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Rarity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items ? items.map((row) => {
                        const s = damageTypes[row.defaultDamageType];
                        const link = itemType ? '/items/'+ itemType +'/' + row.hash + '/' + row.displayProperties.name.replace(/\s/g, ''): '';
                        return (
                        <TableRow key={row.index}>
                                <TableCell component="th" scope="row" padding="none">
                                    <a href={link}>
                                        <img alt="icon" src={path + row.displayProperties.icon} className={styles.itemIcon} />
                                        </a>
                            </TableCell>
                                <TableCell align="left" href={link}><a href={link}>{row.displayProperties.name}</a></TableCell>
                            <TableCell align="right">{s}</TableCell>
                            <TableCell align="right">{row.itemTypeDisplayName}</TableCell>
                            <TableCell align="right">{row.inventory.tierTypeName}</TableCell>
                        </TableRow>
                        )
                    }) : (<p>Loading</p>)
                    }
            </TableBody>
            </>
    );
}


