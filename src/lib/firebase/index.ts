// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCl-02v-Rs_zozDw_t8euLnywQLwd5wtnI",
  authDomain: "reservify-fd049.firebaseapp.com",
  projectId: "reservify-fd049",
  storageBucket: "reservify-fd049.appspot.com",
  messagingSenderId: "869543132487",
  appId: "1:869543132487:web:ef3a092b81faaa6f7c2062",
  measurementId: "G-QR2060E3J3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Initialize Firestore
const db = getFirestore(app);
// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firebase Storage
const storage = getStorage(app, "gs://reservify-fd049.appspot.com");

export { app as firebaseApp, db, auth as firebaseAuth, storage };
