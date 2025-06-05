// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmFh21SLGU8edfEeDNTj5W3FmtviZG1p0",
  authDomain: "trading-website-3be33.firebaseapp.com",
  projectId: "trading-website-3be33",
  storageBucket: "trading-website-3be33.firebasestorage.app",
  messagingSenderId: "238308115641",
  appId: "1:238308115641:web:84556e221dc27a36424768",
  measurementId: "G-C07YLR69RM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const ANALYTICS = getAnalytics(app);