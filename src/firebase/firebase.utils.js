// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
// Initialize authentication
export const auth = getAuth();
// Initialize firestore
const db = getFirestore();

/************** Authentication **************/
export const signUpWithEmailAndPassword = async (signUpInfo) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      signUpInfo.email,
      signUpInfo.password
    );
    await updateProfile(auth.currentUser, {
      displayName: signUpInfo.name,
    });
    const { password, ...signUpInfoWithoutPassword } = signUpInfo;
    await createUserFirestore(signUpInfoWithoutPassword);             // what if only this step threw error?????
    return signUpInfoWithoutPassword;
  } catch (error) {
    console.error("Error creating the profile: ", error);
    throw error;
  }
};

export const signOutGoogle = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

/**************** Firestore ****************/
export const createUserFirestore = async (user) => {
  try {
    await addDoc(collection(db, "users"), user);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
