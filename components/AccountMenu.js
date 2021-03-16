import { useState, useRef, useEffect } from 'react'
import { Button, IconButton, ClickAwayListener, Paper, Grow, Popper, MenuItem, MenuList, CardContent, Card } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from '../lib/auth/initFirebase'
import { useSelector, useDispatch } from 'react-redux'

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };   

    const handleSignout = () => {
        window.localStorage.removeItem('bungieToken');
        location.reload();
       // firebase.auth().signOut().then(function () {
           // location.reload();
        //}).catch(function (error) {
           // console.log(error)
       // });
    }

    return (
        <div>
            <IconButton
                aria-label="toggle menu"
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true">
                <AccountCircleIcon />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleSignout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )

}