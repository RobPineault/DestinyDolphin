import '../styles/globals.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/theme';
//import UserProvider from '../context/userContext'
import SidebarProvider from '../context/sidebarContext'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
/*
import { bungieSignInReturn } from '../redux/ducks/user/userSlice'

const onBeforeLift = (store) => {
    const state = store.getState()
    if (state.user.signingIn) {
        store.dispatch(bungieSignInReturn())
    }
    //const userState = useSelector((state) => state.user)
    //{ signedIn, signingIn, bungieToken }
    console.log(store.getState())
}
<PersistGate loading={null} onBeforeLift={onBeforeLift(store)} persistor={persistor}>
</PersistGate>
*/
function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    //let persistor = persistStore(store)
    return (
        <Provider store={store}>
                    <SidebarProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <Component {...pageProps} /> 
                        </ThemeProvider>
                    </SidebarProvider>            
        </Provider>
    )
}

export default MyApp
