// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyl4cVgSTTErwxKpgaEHHGby3n9r-QjI0",
  authDomain: "shopmate-site.firebaseapp.com",
  projectId: "shopmate-site",
  storageBucket: "shopmate-site.firebasestorage.ap",
  messagingSenderId: "573488384007X",
  appId: "1:573488384007:web:3a08c792db52a6591182a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
