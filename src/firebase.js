import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "smart-civic-eye-83e60.firebaseapp.com",
  projectId: "smart-civic-eye-83e60",
  storageBucket: "smart-civic-eye-83e60.firebasestorage.app",
  messagingSenderId: "874621067936",
  appId: "1:874621067936:web:68ba6d3fb4311fd1621fc5",
  measurementId: "G-Y0TZ1NPHR5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

