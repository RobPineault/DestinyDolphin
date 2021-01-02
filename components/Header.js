import SidebarMenu from './SidebarMenu';
import Nav from './Nav';
import AccountMenu from './AccountMenu';
import { AppBar, Toolbar } from '@material-ui/core';

export default function Header() {     
    return (
        <>
            <AppBar>  
                <Toolbar className="container-row">
                    <SidebarMenu />                
                    <Nav />
                    <AccountMenu />                    
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
        </>
    );
}