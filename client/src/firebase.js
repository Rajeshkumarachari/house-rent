import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-9e866.firebaseapp.com",
  projectId: "mern-auth-9e866",
  storageBucket: "mern-auth-9e866.appspot.com",
  messagingSenderId: "1061717226344",
  appId: "1:1061717226344:web:212a4fde6ade96000e9cdd",
};

export const app = initializeApp(firebaseConfig);
