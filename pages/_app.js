import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
import UserProvider from '../context/userContext'
import SidebarProvider from '../context/sidebarContext'

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <SidebarProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} /> 
                </ThemeProvider>
            </SidebarProvider>
        </UserProvider>
    )
}

export default MyApp
