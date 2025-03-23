import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
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
    let newDoc = doc.data();
    newDoc["docId"] = doc.id;
    result.push(newDoc);
  });

  return result;
};

export const getUserMessages = async (userId, chatId) => {
  const q = query(collection(db, `users/${userId}/chats/${chatId}/messages`));
  const querySnap = await getDocs(q);
  var result = [];

  console.log(`users/${userId}/chats/${chatId}/messages`);
  querySnap.docs.forEach((doc) => {
    let newDoc = doc.data();
    newDoc["docId"] = doc.id;
    result.push(newDoc);
  });

  return result;
};

async function blobAudioToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      let base64String = reader.result;
      // Remove the data URL prefix if you only want the base64 part
      const base64Content = base64String.split(",")[1];
      resolve(base64Content);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Example usage:
async function encodeAudio(audioBlob) {
  try {
    const base64Audio = await blobAudioToBase64(audioBlob);
    console.log("b64 string", base64Audio); // Output the base64 encoded audio data
    return base64Audio;
  } catch (error) {
    console.error("Error encoding audio blob:", error);
    return null;
  }
}

export const startNewChatFromAudio = async (
  userId,
  audioBlob,
  updateChats,
  setCurrentChatUid
) => {
  const newChatDoc = await addDoc(collection(db, `users/${userId}/chats`), {
    time: Date.now(),
    name: "",
  });

  // const base64audio = encodeAudio(audioBlob);

  var reader = new window.FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onloadend = async function () {
    var base64 = "";
    base64 = reader.result;
    base64 = base64.split(",")[1];
    console.log(base64);
    const newMessageDoc = await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: false,
        type: "audio",
        content: base64, // Parse audio file into base64 and add here as content
      }
    );
  };

  // Update the ui by calling updateChats and then callign setCurrentChatUid
  await updateChats();
  setCurrentChatUid(newChatDoc.id);
};

export const getCollection = (collectionName) => {
  return collection(collectionName).get();
};

// ... other firestore functions (update, delete, etc.)
