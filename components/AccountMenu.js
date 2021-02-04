import { useState, useRef, useEffect } from 'react'
import { Button, IconButton, ClickAwayListener, Paper, Grow, Popper, MenuItem, MenuList, CardContent, Card } from '@material-ui/core';
import { useRouter } from 'next/router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import firebase from '../lib/auth/initFirebase'
import { initUser } from '../redux/ducks/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import Character from './Character'

export default function AccountMenu() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);  
    const router = useRouter()
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
        router.push('/api/bungieAuth?origin=' + router.pathname)

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
    
    const { signedIn } = useSelector((state) => state.user)
    if (!signedIn) {  
        
        return (
            <div className="container-row">
                <Button variant="outlined" color="secondary">Sign In</Button>
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
    const { testToken, bungieToken } = useSelector((state) => state.user)
    const { initialized, profile, characters } = useSelector((state) => state.user.activeProfile)
    const dispatch = useDispatch()

    useEffect(() => {        
            if (!initialized) {
                dispatch(initUser(bungieToken))
            }                         
    }, []);

    return (
        <div className="container-row">
            <Card>
                <CardContent>
                    <Character loading={characters.loading}
                        character={characters.data[characters.activeCharacter]}
                    />
                </CardContent>
            </Card>
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