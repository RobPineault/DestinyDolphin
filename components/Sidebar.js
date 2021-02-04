import { List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link'
import Character from './Character'
import { useUser } from '../context/userContext'
import { useSelector, useDispatch } from 'react-redux'


const menu = [
    {
        label: "Inventory",
        pathname: "/user/inventory",
    },
    {
        label: "Exotics",
        pathname: "/exotics",
    },
    {
        label: "Triumphs",
        pathname: "/user/triumphs",
    },
    {
        label: "Titles",
        pathname: "/user/titles",
    },
    {
        label: "Emblems",
        pathname: "/user/emblems",
    },
];

export default function Sidebar() {
    const { signedIn } = useSelector((state) => state.user)
    //const { characters } = useSelector((state) => state.user.activeProfile)
    // <Character character={characters.data[characters.activeCharacterId]} />
    const i = 0;
    const disabled = signedIn ? false : true;
    return (
        <>  
            <List className="sidebar-links" dense={true}>
                {menu.map(item =>
                    <Link key={item.label} href={item.pathname} passHref>
                        <ListItem disabled={ disabled } button component="a" >
                            <ListItemText>{item.label}</ListItemText>
                        </ListItem>
                    </Link>
                )}
            </List>
        </>
    );
}


