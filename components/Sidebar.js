import { List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link'
import CharacterCard from './CharacterCard'
import { useUser } from '../context/userContext'

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
    const { user } = useUser();
    const i = 0;
    const disabled = user ? false : true;
    return (
        <>  
            {user ? (
                <>
                <CharacterCard character={user.characters[i]} />           
            
                    </>
            ) : (<div>sign in to unlock account features</div>)} 
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


