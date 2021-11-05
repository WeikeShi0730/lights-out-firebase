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
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

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
    await createUserFirestore(signUpInfoWithoutPassword); // what if only this step threw error?????
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
    const currentUser = await getUserFirestore(signInInfo);
    return currentUser;
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

const getUserFirestore = async (user) => {
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

const q = query(collection(db, "users"), orderBy("timer"));
export const getUsers = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      unsubscribe();
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      resolve(users);
    }, reject);
  });
};

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
