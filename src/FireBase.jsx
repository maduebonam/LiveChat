import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3ETvcQ6oLpQPO1uvzlD38ZDKF9Ij_434",
    authDomain: "livechat-194cf.firebaseapp.com",
    projectId: "livechat-194cf",
    storageBucket: "livechat-194cf.appspot.com",
    messagingSenderId: "709767320352",
    appId: "1:709767320352:web:e453c0acafaa8bea727d45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Pass `app` here to initialize auth with Firebase app
export const db = getFirestore(app);





