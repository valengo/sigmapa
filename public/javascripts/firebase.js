// Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCV2gotuFsZ_CAlN62FB7DC_haRyQmZARI",
    authDomain: "sigmapa-v2.firebaseapp.com",
    databaseURL: "https://sigmapa-v2.firebaseio.com",
    projectId: "sigmapa-v2",
    storageBucket: "sigmapa-v2.appspot.com",
    messagingSenderId: "440626971343",
    appId: "1:440626971343:web:a803516903a65b7f0aadba"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());

let uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);