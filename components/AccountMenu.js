import { useState, useRef, useEffect } from 'react'
import Router from 'next/router'
import { Button, IconButton, ClickAwayListener, Paper, Grow, Popper, MenuItem, MenuList } from '@material-ui/core';
import { useRouter } from 'next/router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from '../lib/auth/initFirebase'
import { useUser } from '../context/userContext'
import { initUser } from '../redux/ducks/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const { loadingUser, user } = useUser();    
    const router = useRouter()
    
    const { signedIn, testToken } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {        
        if (signedIn) {
            dispatch(initUser(testToken))
        }        
    }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleSignIn = () => {
        Router.push('/api/bungieAuth?origin=' + router.pathname, '/login')

        /*
        var win = window.open('/api/bungieAuth');
        var timer = setInterval(function () {
            if (win.closed) {
                clearInterval(timer);
                let token = null;
                token = window.localStorage.getItem('bungieToken');
                if (token) {
                    location.reload()
                }
                else {
                    alert('Login failed');
                }
            }
        }, 1000);
        */
    };
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleSignout = () => {
        window.localStorage.removeItem('bungieToken');
        firebase.auth().signOut().then(function () {
            location.reload();
        }).catch(function (error) {
            console.log(error)
        });
    }
    if (loadingUser) { return (<h3>Loading</h3>) }
    if (user) {
        var data = user
        console.log(data)
    }

    return (
        <div className="container-row">
            {user ? (<div className='container-column'>
                <h4>{user.membership.displayName}</h4>
            </div>

            ) : (
                    <Button variant="outlined" color="secondary" onClick={handleSignIn}>Sign in</Button>
                )} 

        <div>
            <IconButton
                aria-label="sign out"
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
            </div>
    );
}