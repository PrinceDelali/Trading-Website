// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 

const firebaseConfig = {
  apiKey: "AIzaSyBmFh21SLGU8edfEeDNTj5W3FmtviZG1p0",
  authDomain: "trading-website-3be33.firebaseapp.com",
  projectId: "trading-website-3be33",
  storageBucket: "trading-website-3be33.firebasestorage.app",
  messagingSenderId: "238308115641",
  appId: "1:238308115641:web:84556e221dc27a36424768",
  measurementId: "G-C07YLR69RM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); //

export { auth, analytics }; // 
