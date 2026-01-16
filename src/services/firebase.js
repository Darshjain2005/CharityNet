import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// ADD THIS LINE TO FIX THE ERROR:
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBlP91iQoSxaWxk-S1WbxrT7ic5bu4vIoc",
  authDomain: "charitynet-6ebdc.firebaseapp.com",
  databaseURL: "https://charitynet-6ebdc-default-rtdb.firebaseio.com",
  projectId: "charitynet-6ebdc",
  storageBucket: "charitynet-6ebdc.firebasestorage.app",
  messagingSenderId: "197476262169",
  appId: "1:197476262169:web:0c05f2ecce43f129c7a588",
  measurementId: "G-JDBJGKRLC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
// FIX: Pass 'app' to getDatabase and export it
export const rtdb = getDatabase(app); 

export const googleProvider = new GoogleAuthProvider();

// Google Sign-In helper
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);