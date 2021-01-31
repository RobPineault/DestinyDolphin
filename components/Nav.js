import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tabs, Tab, List, ListItem, ListItemText, Popper, Divider } from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';
import menuData from '../lib/menu'
import tabLink from './TabLink'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = theme => ({

    flex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    },
    subMenu: {
        backgroundColor: theme.palette.lightBlue,
    },
    navMenu: {
        display: 'none'
    },
    tabContainer: {
        marginLeft: 32,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    tabItem: {
        minWidth: 'auto',
        marginTop: 14,
        height: 54,
    }
})

const LinkTab = React.forwardRef(({ href, as, prefetch, ...props }, ref) => (  
        <Link href={href} as={as} prefetch={prefetch} passHref>
         <Tab className="menu-tab" ref={ref} {...props} />         
        </Link>
    )
)
function Nav(props) {
    const [open, setOpen] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { route } = useRouter();
    const { classes } = props;

    const isActive = (index) => {
        let value = 0;
        menuData.forEach((item, i) => {
            if (route == '/') { value = 0 }
            else if (route.startsWith(item.pathname)) {
                value = i;
            }
        })
        if (value == index) { return true }
        return false
    }
    const handleEnter = (e) => {   
        let tab = e.currentTarget;
        //tab.nextSibling.style.display = "block";
        tab.firstChild.classList.add("tab-selected");
        setOpen(tab.getAttribute("data-index"));
        setAnchorEl(tab);
    }
    const handleLeave = (e) => {
        let tab = e.currentTarget;
        //tab.nextSibling.style.display = "none";
        if (!isActive(tab.getAttribute("data-index"))) {
            tab.firstChild.classList.remove("tab-selected");
        }
        setOpen(null);
        setAnchorEl(null);
    }
    function isOpen(index) {
        if (open == index) { return true }
        return false
    }
    //const open = Boolean(anchorEl);

    return (
        <nav >   
            <div className="menu-container">
                {menuData.map((item, index) => {
                    const open = isOpen(index);
                    return (
                        <div key={item.label} data-index={index } className="menu-item" onMouseLeave={handleLeave} onMouseOver={handleEnter}>
                            <LinkTab open={open} classes={{ root: classes.tabItem }} className={isActive(index) ? "tab-selected" : ""} label={item.label} href={item.pathname} />

                            {item.subMenu ? (
                                <Popper id={"popper-" + index} open={open} anchorEl={anchorEl}  disablePortal>
                                    <div className="menu-underline" />
                                    <List className="sub-menu white" dense={true} disablePadding={true}>
                                        {item.subMenu.map((subItem, i) =>
                                            <div key= { subItem.label }>
                                                <Link  href={subItem.pathname} passHref>
                                                <ListItem button component="a" >
                                                        <ListItemText>{subItem.label}</ListItemText>
                                                </ListItem>
                                                </Link> 
                                                {item.subMenu[i + 1] ? (<Divider variant="middle" />) : (<></>)}
                                            </div>
                                    )}
                                </List>
                            </Popper>
                            ) : (<></>)}
                            <Divider orientation="vertical" flexItem />
                    </div>
                )})}
                </div>
        </nav>
    )
}
export default withStyles(styles)(Nav);
//                    <div onMouseLeave={handleLeave} onMouseEnter={handleEnter} id={ index} key={index}>
            /*
                        <Tabs
                value={getActiveTab()}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="nav tabs"
            >
                */