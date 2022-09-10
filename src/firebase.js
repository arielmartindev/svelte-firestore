
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBH8nIrZFpkskQQvmw4jRCnV80L6mmVDC8",
  authDomain: "svelte-firestore-301c5.firebaseapp.com",
  projectId: "svelte-firestore-301c5",
  storageBucket: "svelte-firestore-301c5.appspot.com",
  messagingSenderId: "598005608640",
  appId: "1:598005608640:web:75ea3162291b8c774f7d25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

