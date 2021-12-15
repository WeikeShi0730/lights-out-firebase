// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  setDoc,
  getDoc,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize authentication
export const auth = getAuth();
// Initialize firestore
const db = getFirestore(app);

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
    await createUserFirestore(signUpInfoWithoutPassword);
    return signUpInfoWithoutPassword;
  } catch (error) {
    console.error("Error creating the profile: ", error);
    throw error;
  }
};

export const signInWithEmail = async (signInInfo) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      signInInfo.email,
      signInInfo.password
    );
  } catch (error) {
    console.error("Error signing: ", error);
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

export const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    await deleteUser(user);
    await deleteUserFirestore(user.email);
  } catch (error) {
    console.error("Error deleting account: ", error);
    throw error;
  }
};

/**************** Firestore ****************/
const createUserFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.email), user);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const getUserFirestore = async (user) => {
  try {
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("no user found");
    }
  } catch (error) {
    console.error("error signing in: ", error);
    throw error;
  }
};

export const updateUserTimer = async (userEmail, userNewTimer) => {
  try {
    const userRef = doc(db, "users", userEmail);
    await updateDoc(userRef, {
      timer: userNewTimer,
    });
  } catch (error) {
    console.error("Error updating timer: ", error);
    throw error;
  }
};

export const leaderboardQuery = query(
  collection(db, "users"),
  orderBy("timer")
);

const deleteUserFirestore = async (userEmail) => {
  try {
    await deleteDoc(doc(db, "users", userEmail));
  } catch (error) {
    console.error("Error deleting account: ", error);
    throw error;
  }
};

export const deleteUserRecord = async () => {
  try {
    const userEmail = auth.currentUser.email;
    const userRef = doc(db, "users", userEmail);
    await updateDoc(userRef, {
      timer: Number.MAX_VALUE,
    });
  } catch (error) {
    console.error("Error deleting user record: ", error);
    throw error;
  }
};
