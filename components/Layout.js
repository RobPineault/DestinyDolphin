import React from "react"
//import styles from '../styles/Home.module.css'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import ScrollTop from './ScrollTop'
import PageContainer from './PageContainer'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';

export default function Layout({ title, description = undefined, children }) { 

    return (        
        <PageContainer  title={title} description={description}>
            <Header/>
            <Body >
                 {children}
            </Body>
            <Footer />
            <ScrollTop >
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop> 
        </PageContainer>
        
    );
}
