// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS9Lws0e64TTJT8wvnFrD8YD5vLzy91xM",
  authDomain: "vitacare-cac57.firebaseapp.com",
  projectId: "vitacare-cac57",
  storageBucket: "vitacare-cac57.firebasestorage.app",
  messagingSenderId: "836240865612",
  appId: "1:836240865612:web:392a9dd768f8f4e6c037e9",
  measurementId: "G-J5FX9H7H94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);