import { useState, useEffect, createContext, useContext } from 'react'
import firebase from '../lib/auth/initFirebase'
import { initPlayer } from '../lib/destiny/user/initUser'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        // Listen authenticated user
        const unsubscriber = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
            try {
                let token = JSON.parse(window.localStorage.getItem('bungieToken'));
                if (firebaseUser && token) {                    
                    // const userDoc = await firebase.firestore().doc(`users/${uid}`).get
                    initPlayer(token.membership_id).then((user) => {
                        setUser(user);
                    }).catch((error) => {
                        console.log("failed to get profile data");
                    });                                                                     
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