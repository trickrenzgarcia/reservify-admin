// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHCdtN61I0SDVk5gAR43rKDDtXhIF3Saw",
  authDomain: "ecobin-2f816.firebaseapp.com",
  projectId: "ecobin-2f816",
  storageBucket: "ecobin-2f816.appspot.com",
  messagingSenderId: "236441465522",
  appId: "1:236441465522:web:52d01731c6d41148af8fab",
  measurementId: "G-Z29KQZ9MZ3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firestore
const db = getFirestore(app);
// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firebase Storage
const storage = getStorage(app, "gs://ecobin-2f816.appspot.com");

export { app as firebaseApp, db, auth as firebaseAuth, storage };
