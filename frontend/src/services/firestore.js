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
        fromUser: true,
        type: "audio",
        content: base64, // Parse audio file into base64 and add here as content
      }
    );
  };

  // Update the ui by calling updateChats and then callign setCurrentChatUid
  await updateChats();
  setCurrentChatUid(newChatDoc.id);

  // const audioBlob = new Blob(recordedChunks, {
  //   type: "audio/ogg;codecs=opus",
  // });

  // upload form data
  var data = new FormData();
  data.append("audio", audioBlob, "audio");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const URL = `${BACKEND_URL}/feedback/audio`;
  const response = await fetch(URL, {
    method: "POST",
    body: data,
  });
  if (response.ok) {
    const json = await response.json();
    await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: false,
        type: "audioResponse",
        content: json.feedback,
      }
    );
  }

  const URL2 = `${BACKEND_URL}/feedback/vocal`;
  const response2 = await fetch(URL2, {
    method: "POST",
    body: data,
  });
  if (response.ok) {
    const json2 = await response2.json();
    await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: false,
        type: "audioResponse",
        content: json2.feedback,
      }
    );
  }
};

export const getCollection = (collectionName) => {
  return collection(collectionName).get();
};

// ... other firestore functions (update, delete, etc.)
