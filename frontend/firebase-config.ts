import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDj6qT6dfmgyE6IYE9z6F0ptS1aE-oS4zM",
    authDomain: "aichatbot-8867b.firebaseapp.com",
    projectId: "aichatbot-8867b",
    storageBucket: "aichatbot-8867b.appspot.com",
    messagingSenderId: "900674058780",
    appId: "1:900674058780:web:cb29f2bea7f99277017dd9",
    measurementId: "G-BSCS45D2LD",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
