import { useState, useEffect, createContext, useContext } from 'react'
import firebase from '../lib/auth/initFirebase'
import { initPlayer } from '../lib/destiny/BungieUser'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
    const [user, setUser] = useState(null)
   //const [bungieUser, setBungieUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

    useEffect(() => {
        // Listen authenticated user
        const unsubscriber = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
            try {
                let token = JSON.parse(window.localStorage.getItem('bungieToken'));
                if (firebaseUser && token) {
                    // User is signed in.                    
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get

                    initPlayer(token.membership_id).then((user) => {
                        setUser(user);
                    }).catch((error) => {
                        console.log("failed to get profile data");
                    });             
                       
                    /*
                    const bUser = new BungieUser(token.membership_id || uid);                    
                    bUser.initUser().then(() => {
                        return bUser.setProfileInfo();                            
                    }).then(() => {
                        setUser(bUser);
                    }).catch ((error)=> {
                        console.log("failed to get profile data");
                    })  */                 
                                                            
                } else setUser(null)
            } catch (error) {
                console.log("context: sign in error");
            } finally {
                setLoadingUser(false)
            }
        })
        // Unsubscribe auth listener on unmount
        return () => unsubscriber()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loadingUser }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)