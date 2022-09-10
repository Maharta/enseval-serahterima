// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCikhQpbd0cP7Cg4qGso3eGG3IJdDWYKrQ",

  authDomain: "enseval-serahterima.firebaseapp.com",

  projectId: "enseval-serahterima",

  storageBucket: "enseval-serahterima.appspot.com",

  messagingSenderId: "549895048993",

  appId: "1:549895048993:web:d937ba137e7f0702f0f860",

  measurementId: "G-PH4TG9ZV53",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth();

export { auth };
