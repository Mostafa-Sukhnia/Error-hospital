// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD976_qMSSw6LwZEmHM1SXxve99I3Yd4O0",
  authDomain: "error-barber.firebaseapp.com",
  projectId: "error-barber",
  storageBucket: "error-barber.firebasestorage.app",
  messagingSenderId: "186709308286",
  appId: "1:186709308286:web:e2a53d6f1898d9ec4b392f",
  measurementId: "G-Z119HMLV22"
};


 const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export default app
