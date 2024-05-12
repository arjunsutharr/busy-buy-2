import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-firebase-api-key",
  authDomain: "your-firebase-auth-domain.firebaseapp.com",
  projectId: "your-firebase-project-id",
  storageBucket: "your-firebase-bucket-id",
  messagingSenderId: "your-firebase-messagingSender-id",
  appId: "your-firebase-app-id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
