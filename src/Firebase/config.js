import { getFirestore } from 'firebase/firestore'; 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXA0SbQsdn-NHeGxIEneCsHHgibH7bs_Q",
  authDomain: "movie-collection-973be.firebaseapp.com",
  projectId: "movie-collection-973be",
  storageBucket: "movie-collection-973be.appspot.com",
  messagingSenderId: "277256678101",
  appId: "1:277256678101:web:e1816f771fadcd12d7d05c",
  measurementId: "G-DD13W5KBET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db

