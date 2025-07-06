// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Paste your own config from Firebase console
const firebaseConfig = {
 apiKey: "AIzaSyDr4zFiina-CBxYvsSUvHXtRYzRaYbNX94",
 authDomain: "pyara-174fc.firebaseapp.com",
  projectId: "pyara-174fc",
  storageBucket: "pyara-174fc.firebasestorage.app",
  messagingSenderId: "94305870301",
  appId: "1:94305870301:web:d103db920542ab99bbd634",
  measurementId: "G-JKE35SMKM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
