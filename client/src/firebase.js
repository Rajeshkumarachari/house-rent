// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yellow-b3258.firebaseapp.com",
  projectId: "yellow-b3258",
  storageBucket: "yellow-b3258.firebasestorage.app",
  messagingSenderId: "878304971528",
  appId: "1:878304971528:web:ae2744a286868f3ff77abd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
