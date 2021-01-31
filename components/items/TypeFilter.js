import { weaponType } from '../../lib/destiny/constants'
import { List, ListItem } from '@material-ui/core';
const TypeFilter = ({ toggle, isActive }) => {
    const filterCategory = 'type'
    const types = ['AutoRifle',
        'Hand Cannon',
        'Pulse Rifle',
        'Scout Rifle',
        'Fusion Rifle',
        'Sniper Rifle',
        'Shotgun',
        'Machine Gun',
        'Rocket Launcher',
        'Side Arm',
        'Bow',
        'Submachine Gun',
        'Linear Fusion Rifle',
        'Sword',
        'Trace Rifle',
        'Grenade Launcher',] 
    return (
        <List className='filter-list'>
            {types.map(type => (
                <ListItem
                    key={type}
                    button={true}
                    className={isActive(filterCategory, weaponType[type.replace(/\s/g, '')])}
                    onClick={() => toggle(filterCategory, weaponType[type.replace(/\s/g, '')])}
                >{type}</ListItem>
                ))}          
        </List>
    )
}
export default TypeFilter
