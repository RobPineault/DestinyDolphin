import * as admin from 'firebase-admin'

export const verifyIdToken = (token) => {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: "destiny-dolphin",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // https://stackoverflow.com/a/41044630/1332513
                privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
            }),
            databaseURL: "https://destiny-dolphin.firebaseio.com",
        })
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            throw error
        })
}

export const adminInit = () => {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: "destiny-dolphin",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
            }),
            databaseURL: "https://destiny-dolphin.firebaseio.com",
        })
    }
    return admin
}
