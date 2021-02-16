import { List, ListItem, ListItemText } from '@material-ui/core';
import Link from 'next/link'
import SignIn from './SignIn'
import { useSelector } from 'react-redux'


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
    const signedIn = useSelector((state) => state.user.signedIn)
    return (
        <>  
            {signedIn ? (<List className="sidebar-links" dense={true}>
                {menu.map(item =>
                    <Link key={item.label} href={item.pathname} passHref>
                        <ListItem button component="a" >
                            <ListItemText>{item.label}</ListItemText>
                        </ListItem>
                    </Link>
                )}
            </List>) : (
                    <>
                        <p>This content requires login</p>
                        <SignIn />
                        </>
                    )}
            
        </>
    );
}


