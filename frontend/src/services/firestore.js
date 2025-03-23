import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";

export const addUser = (userId, userData) => {
  return collection("users").doc(userId).set(userData);
};

export const getUser = (userId) => {
  return collection("users").doc(userId).get();
};

export const getUserChats = async (userId) => {
  const q = query(collection(db, `users/${userId}/chats`));
  const querySnap = await getDocs(q);
  var result = [];

  console.log(`users/${userId}/chats`);
  querySnap.docs.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
};

export const getCollection = (collectionName) => {
  return collection(collectionName).get();
};

// ... other firestore functions (update, delete, etc.)
