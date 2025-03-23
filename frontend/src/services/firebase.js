// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuEQtial0HScShpwupRXDpRzC9NAa3fYM",
  authDomain: "speech-articulator.firebaseapp.com",
  projectId: "speech-articulator",
  storageBucket: "speech-articulator.firebasestorage.app",
  messagingSenderId: "671350928114",
  appId: "1:671350928114:web:8628d9681cf4bd5472966b",
  measurementId: "G-XCWG5DDD36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
