import styles from '../styles/Destiny.module.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

const path = 'https://www.bungie.net'
const damageTypes = {
    1: 'Kinetic',
    2: 'Arc',
    3: 'Solar',
    4: 'Void',
}
export default function Layout({ items }) {
    return (
        <TableContainer component={Card}>
            <Table className="item-table" aria-label="simple table" padding="default">
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
                    {items.map((row) => {
                        const s = damageTypes[row.defaultDamageType];
                        const link = '/items/weapons/' + row.hash;
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
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


