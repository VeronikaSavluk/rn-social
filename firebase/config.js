// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeAPqZPgstByZ6FOdYu7NLTuqHT4uYz_A",
  authDomain: "rn-social-acbb1.firebaseapp.com",
  projectId: "rn-social-acbb1",
  storageBucket: "rn-social-acbb1.appspot.com",
  messagingSenderId: "503225007124",
  appId: "1:503225007124:web:f35d69aa799ada854ebb01",
  measurementId: "G-CHS2DPNEXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;