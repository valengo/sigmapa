const RemoteAuthService = require('../application/contracts/remote-auth-service')
const firebaseAdmin = require('firebase-admin');

module.exports = class RemoteAuthFirebase extends RemoteAuthService {
    constructor() {
        super();

        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            }),
            databaseURL: 'https://sigmapa-v2.firebaseio.com'
        });
    }

    async getDecodedToken(idToken) {
        try {
            return await firebaseAdmin.auth().verifyIdToken(idToken)
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }
}