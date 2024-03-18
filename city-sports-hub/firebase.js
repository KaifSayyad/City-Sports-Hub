// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , initializeAuth, getReactNativePersistence} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOdXQ7OgTMybDNKHqHVWFSc_6P87xKBYU",
  
  authDomain: "sportify-d50c8-ee719.firebaseapp.com",
  projectId: "sportify-d50c8",
  storageBucket: "sportify-d50c8.appspot.com",
  messagingSenderId: "994203118632",
  appId: "1:994203118632:web:8f645cdf63cfedc0a8991d",
  measurementId: "G-S8YHVH4F9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);

export {app, auth, firestore};