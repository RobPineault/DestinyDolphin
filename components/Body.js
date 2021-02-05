import clsx from 'clsx';
import { useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { Drawer, Divider, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSidebar } from '../context/sidebarContext'
import Sidebar from './Sidebar'
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        
    },
    drawerContainer: {
        overflow: 'auto',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        minHeight: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing(4),
        marginRight: '200px',     
        transition: theme.transitions.create(['margin', 'padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create(['margin','padding'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        paddingLeft: '20px',
        marginLeft: drawerWidth,
    },
}));

export default function Body({ children }) {    
    const { open } = useSidebar();    
    const classes = useStyles();
    return (
        <>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
                classes={{ paper: classes.drawerPaper,}}
            >
                <div style={{ height: "100px" }} />
                <Sidebar/>
 
        </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
            {children}
            </main>
            </>
    );
}