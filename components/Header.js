import SidebarMenu from './SidebarMenu';
import Nav from './Nav';
import AccountMenu from './AccountMenu';
import HeaderProfile from './HeaderProfile';
import SignIn from './SignIn';
import { AppBar, Toolbar } from '@material-ui/core';
import { useSelector } from 'react-redux'

export default function Header() {
    const signedIn = useSelector((state) => state.user.signedIn)
    return (
        <>
            <AppBar>  
                <Toolbar className="container-row">
                    <SidebarMenu signedIn={signedIn} />                
                    <Nav />
                    {signedIn ?
                        <>
                            <HeaderProfile />
                            <AccountMenu />
                        </> :
                        <SignIn />
                    }                                       
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
        </>
    );
}