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
    callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                $.ajax({
                    url: '/login',
                    type: 'POST',
                    headers: {Authorization: idToken}
                }).done(function () {
                    window.location.replace('/index');
                });
            }).catch(function (error) {
                console.log('Error trying to get user! ' + error);
            });
            return false;
        }
    },
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '/privacy-policy',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('/privacy-policy');
    }
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);