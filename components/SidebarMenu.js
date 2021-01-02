import { useEffect } from 'react'

import { useSidebar } from '../context/sidebarContext'
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function SidebarMenu() {

    const { open, setOpen } = useSidebar();




    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div className='container-row'>
            
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                     onClick={open ? handleDrawerClose : handleDrawerOpen }
                    edge="start"
                    className={'menu-button'}
                >
                    <MenuIcon />
            </IconButton>
            <div className="logo" />           
        </div>
    )
}