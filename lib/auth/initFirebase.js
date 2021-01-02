import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
//const config = {
//    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
//    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//}
export const config = {
    apiKey: "AIzaSyDnvXCJ5xO8F8WIpSDLkeGObFV6FVTfYrM",
    authDomain: "destiny-dolphin.firebaseapp.com",
    databaseURL: "https://destiny-dolphin.firebaseio.com",
    projectId: "destiny-dolphin",
    storageBucket: "destiny-dolphin.appspot.com",
    messagingSenderId: "1079230659595",
    appId: "1:1079230659595:web:5eff008d0222bf0c551b0e",
    measurementId: "G-QRK54VZQMP"
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(config)
    // To enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in config) firebase.analytics()
}

export default firebase
