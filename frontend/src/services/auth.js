import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUp = (email, password) => {
  console.log(email, password);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
  return auth.signOut();
};

// export const getCurrentUser = () => {
//   return auth.currentUser;
// };

// ... other auth functions (reset password, etc.)
