import { firestore } from "./firebase";

export const addUser = (userId, userData) => {
  return firestore.collection("users").doc(userId).set(userData);
};

export const getUser = (userId) => {
  return firestore.collection("users").doc(userId).get();
};

export const getCollection = (collectionName) => {
  return firestore.collection(collectionName).get();
};

// ... other firestore functions (update, delete, etc.)
