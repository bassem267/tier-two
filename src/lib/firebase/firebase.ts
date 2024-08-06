// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-cNwh3vg2NwZ3CFKe95qzMVY7VrN_WEk",
  authDomain: "tier-two.firebaseapp.com",
  projectId: "tier-two",
  storageBucket: "tier-two.appspot.com",
  messagingSenderId: "879931339621",
  appId: "1:879931339621:web:c6b6cdba76d87fc453278c",
  measurementId: "G-WP3BQ14GGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const storage = getStorage(app);

