// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyBKVPNdTIU3nUHBumdD26jfsWh7t8En0eQ',
  authDomain: 'jono-smart-shopping-list.firebaseapp.com',
  projectId: 'jono-smart-shopping-list',
  storageBucket: 'jono-smart-shopping-list.appspot.com',
  messagingSenderId: '402363546313',
  appId: '1:402363546313:web:0e967bd2e6bb7070596b18',
};

let fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
