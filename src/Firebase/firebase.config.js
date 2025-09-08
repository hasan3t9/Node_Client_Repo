// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCSTIym6Ls3_fAxDXqfA1bqo20WaUM6kI",
  authDomain: "node-js-00.firebaseapp.com",
  projectId: "node-js-00",
  storageBucket: "node-js-00.firebasestorage.app",
  messagingSenderId: "42252032295",
  appId: "1:42252032295:web:5ddeae49c3914f0294b102"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app