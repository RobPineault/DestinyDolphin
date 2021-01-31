import { adminInit } from './firebaseAdmin'
import { config } from './initFirebase'
const clientId = process.env.BUNGIE_CLIENT_ID;
const secret = process.env.BUNGIE_CLIENT_SECRET
const credentials = {
    client: {
        id: clientId,
        secret: secret
    },
    auth: {
        tokenHost: 'https://www.bungie.net',
        tokenPath: '/platform/app/oauth/token/',
        authorizePath: '/en/OAuth/Authorize'
    }
};
const { AuthorizationCode } = require('simple-oauth2');

export const oauth2 = new AuthorizationCode(credentials);


export function createFirebaseAccount(userConfig) {
    const admin = adminInit();

    admin.auth().getUser(uid).then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                console.log('creating user')
                admin.auth().createUser({
                    uid: userConfig.id,
                    displayName: userConfig.displayName
                })
            }
        })


    // Create or update the user account.
    const userCreationTask = admin.auth().updateUser(uid, {
        disabled: false
    })
        .catch(error => {
        // If user does not exists we create it.
            if (error.code === 'auth/user-not-found') {
                console.log('creating user')
            return admin.auth().createUser({
                uid: uid
            });
        }
        throw error;
    });
    return Promise.resolve(userCreationTask).then(() => {
        // Create a Firebase custom auth token.
        return admin.auth().createCustomToken(uid).then(token => {
            console.log('Created Custom token for UID "', uid, '" Token:', token);
            return token
        }).catch(e => console.log('Failed to create token', e))        
    }).catch(e => console.log('Failed to create user',e))
}

export function signInFirebaseTemplate(token, btkn) {
    return `
    <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
    <script>
      var token = '${token}';
      var BT = '${JSON.stringify(btkn)}'
      var config = {
        apiKey: '${config.apiKey}'
      };
      window.localStorage.setItem('bungieToken', BT);      
      var app = firebase.initializeApp(config);
      app.auth().signInWithCustomToken(token).then(function() {
        window.close();
      });
    </script>`;
}
