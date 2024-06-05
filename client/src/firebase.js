// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-f0cc6.firebaseapp.com",
  projectId: "real-estate-f0cc6",
  storageBucket: "real-estate-f0cc6.appspot.com",
  messagingSenderId: "899484305189",
  appId: "1:899484305189:web:4bd0a177ff3898d14afccc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);