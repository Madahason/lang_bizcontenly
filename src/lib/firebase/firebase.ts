import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Debug: Log environment variables (first few characters only for security)
const envDebug = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 8) + "...",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  hasStorageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  hasMessagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  hasAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Firebase Config Debug:", envDebug);

// Check for empty or invalid values
if (
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ===
    "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
) {
  throw new Error(
    "Invalid Firebase API Key. Please update NEXT_PUBLIC_FIREBASE_API_KEY in .env.local with your actual Firebase API key."
  );
}

if (
  !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ===
    "your-project.firebaseapp.com"
) {
  throw new Error(
    "Invalid Firebase Auth Domain. Please update NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN in .env.local with your actual Firebase Auth Domain."
  );
}

if (
  !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === "your-project"
) {
  throw new Error(
    "Invalid Firebase Project ID. Please update NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local with your actual Firebase Project ID."
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("Initializing Firebase...");

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized successfully!");

export { app, auth, db, storage };
