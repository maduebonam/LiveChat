import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "default-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "default-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "default-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "default-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "default-sender-id",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "default-app-id",
};
 
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };