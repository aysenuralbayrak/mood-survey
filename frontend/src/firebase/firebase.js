import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mood-survey-app.firebaseapp.com",
    databaseURL: "https://mood-survey-app.firebaseio.com",
    projectId: "mood-survey-app",
    storageBucket: "mood-survey-app.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { firebase, database as default };

