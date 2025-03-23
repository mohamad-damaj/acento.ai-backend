import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(email, password);
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
