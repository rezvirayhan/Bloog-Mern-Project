// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "mern-bloog-project.firebaseapp.com",
    projectId: "mern-bloog-project",
    storageBucket: "mern-bloog-project.appspot.com",
    messagingSenderId: "1011168918835",
    appId: "1:1011168918835:web:4c2adf7c578c2aedb91246"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);