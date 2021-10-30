// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVhsUbiU239dMrFPR7O_2dL_2mSVp0INI",
  authDomain: "f1-lightsout.firebaseapp.com",
  projectId: "f1-lightsout",
  storageBucket: "f1-lightsout.appspot.com",
  messagingSenderId: "670545894167",
  appId: "1:670545894167:web:32b7424669c8c90e5ef552",
  measurementId: "G-5446S2H3H4",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
//export const firestore = firebase.firestore();

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
