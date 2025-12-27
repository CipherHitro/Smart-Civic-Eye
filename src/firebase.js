// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs6COexDv30MaIiWGo-7RIrDDmxDkuxOg",
  authDomain: "smart-civic-eye-83e60.firebaseapp.com",
  projectId: "smart-civic-eye-83e60",
  storageBucket: "smart-civic-eye-83e60.firebasestorage.app",
  messagingSenderId: "874621067936",
  appId: "1:874621067936:web:68ba6d3fb4311fd1621fc5",
  measurementId: "G-Y0TZ1NPHR5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

