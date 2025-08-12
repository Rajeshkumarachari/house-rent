import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rajesh-house-cedab.firebaseapp.com",
  projectId: "rajesh-house-cedab",
  storageBucket: "rajesh-house-cedab.firebasestorage.app",
  messagingSenderId: "1027258284208",
  appId: "1:1027258284208:web:3dedc9ba010f6b4979e375",
  measurementId: "G-HT8CQT8X6Q",
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
