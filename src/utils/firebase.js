// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnuVv9xkNECFhtMfUWnj5NnTwNGw7iEpc",
  authDomain: "netflix-gpt-e0863.firebaseapp.com",
  projectId: "netflix-gpt-e0863",
  storageBucket: "netflix-gpt-e0863.appspot.com",
  messagingSenderId: "373656035204",
  appId: "1:373656035204:web:97b869f6985bedcec947d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
