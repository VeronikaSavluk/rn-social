import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeAPqZPgstByZ6FOdYu7NLTuqHT4uYz_A",
  authDomain: "rn-social-acbb1.firebaseapp.com",
  databaseURL: "https://rn-social-acbb1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-social-acbb1",
  storageBucket: "rn-social-acbb1.appspot.com",
  messagingSenderId: "503225007124",
  appId: "1:503225007124:web:f7f1d3e5553e02734ebb01",
  measurementId: "G-FPRKGRW2KP"
};

firebase.initializeApp(firebaseConfig);

export default firebase;