import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyDHtbWLZAxEQYaItWEVMwJOBPri9Qyq4qM",
  authDomain: "netflix-clone-1f7d4.firebaseapp.com",
  projectId: "netflix-clone-1f7d4",
  storageBucket: "netflix-clone-1f7d4.appspot.com",
  messagingSenderId: "94488142683",
  appId: "1:94488142683:web:e8ecd02f4f02f40592f07e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Creating an account
const signup = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error: any) {
    console.log("Error on Firebase signup:", error);
    toast.error(`${error.code.split('/')[1].split('-').join(' ')}`); 
  }
};

const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.log(error);
    toast.error(`${error.code.split('/')[1].split('-').join(' ')}`); 
  }
};

const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.log("Error during logout:", error);
    toast.error(`${error.code.split('/')[1].split('-').join(' ')}`); 
  }
};

export { auth, db, login, signup, logout };
