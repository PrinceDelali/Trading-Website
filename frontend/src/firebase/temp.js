// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

// Export the app as default
export default app;