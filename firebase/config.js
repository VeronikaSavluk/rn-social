import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeAPqZPgstByZ6FOdYu7NLTuqHT4uYz_A",
  authDomain: "rn-social-acbb1.firebaseapp.com",
  projectId: "rn-social-acbb1",
  storageBucket: "rn-social-acbb1.appspot.com",
  messagingSenderId: "503225007124",
  appId: "1:503225007124:web:f7f1d3e5553e02734ebb01",
  measurementId: "G-FPRKGRW2KP"
};
firebase.initializeApp(firebaseConfig);

export default firebase;