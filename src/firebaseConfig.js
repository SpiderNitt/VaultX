// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Auth
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVKwpbYyc_V3QQ3HNmXQ5AIytzItiywsg",
  authDomain: "extensionsolana.firebaseapp.com",
  projectId: "extensionsolana",
  storageBucket: "extensionsolana.appspot.com",
  messagingSenderId: "684830984780",
  appId: "1:684830984780:web:867f0c364087c9e61282e9",
  measurementId: "G-Z6DQQJZJW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);  // Initialize Firebase Auth

export { auth };
