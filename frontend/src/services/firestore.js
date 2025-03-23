import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Add these helper functions near the top of the file:
function fixPythonDictString(dictStr) {
  // Replace single quotes with double quotes
  let fixed = dictStr.replace(/'/g, '"');
  // Replace Python None, True, and False with JSON null, true, false
  fixed = fixed.replace(/\bNone\b/g, 'null');
  fixed = fixed.replace(/\bTrue\b/g, 'true');
  fixed = fixed.replace(/\bFalse\b/g, 'false');
  return fixed;
}

function safeParseFeedback(feedbackStr) {
  // Only try to parse if it starts with '{' or '['
  if (
    typeof feedbackStr === "string" &&
    (feedbackStr.trim().startsWith("{") || feedbackStr.trim().startsWith("["))
  ) {
    try {
      return JSON.parse(feedbackStr);
    } catch (e) {
      try {
        const fixed = fixPythonDictString(feedbackStr);
        return JSON.parse(fixed);
      } catch (error) {
        console.error("Failed to fix feedback JSON", error);
        return feedbackStr; // Return original string if fixing fails
      }
    }
  }
  // Otherwise, return the original string (or object)
  return feedbackStr;
}

// Your existing Firestore functions follow here:
export const addUser = (userId, userData) => {
  return setDoc(doc(db, "users", userId), userData);
};

export const getUser = (userId) => {
  return getDoc(doc(db, "users", userId));
};

export const getUserChats = async (userId) => {
  const q = query(
    collection(db, `users/${userId}/chats`),
    orderBy("time", "desc")
  );
  const querySnap = await getDocs(q);
  const result = [];

  console.log(`users/${userId}/chats`);
  querySnap.docs.forEach((docSnap) => {
    let newDoc = docSnap.data();
    newDoc["docId"] = docSnap.id;
    result.push(newDoc);
  });

  return result;
};

export const getUserMessages = async (userId, chatId) => {
  const q = query(
    collection(db, `users/${userId}/chats/${chatId}/messages`),
    orderBy("time", "desc")
  );
  const querySnap = await getDocs(q);
  const result = [];

  console.log(`users/${userId}/chats/${chatId}/messages`);
  querySnap.docs.forEach((docSnap) => {
    let newDoc = docSnap.data();
    newDoc["docId"] = docSnap.id;
    result.push(newDoc);
  });

  return result;
};

export const replyFromAudio = async (userId, audioBlob, context, chatId) => {
  var data = new FormData();
  data.append("audio", audioBlob, "audio");
  data.append("context", context, "context");
  const URL = `${BACKEND_URL}/feedback/audio`;
  console.log(URL);
  console.log(data);
  const response = await fetch(URL, {
    method: "POST",
    body: data,
  });
  if (response.ok) {
    const json = await response.json();
    print("json");
    print(json);
    await addDoc(collection(db, `users/${userId}/chats/${chatId}/messages`), {
      time: Date.now(),
      fromUser: false,
      type: "audioResponse",
      content: JSON.stringify(json.feedback),
    });
  } else {
    console.log("ERROR");
    console.log(response.status);
    console.log(response.statusText);
    console.log(await response.json());
  }
};

export const startNewChatFromAudio = async (
  userId,
  audioBlob,
  updateChats,
  setCurrentChatUid
) => {
  console.log("11111");
  // Create new chat document
  const newChatDoc = await addDoc(collection(db, `users/${userId}/chats`), {
    time: Date.now(),
    name: "",
  });
  console.log("22232121");

  // Convert audio blob to base64 for storing as a message
  var reader = new window.FileReader();
  console.log("122222");
  reader.readAsDataURL(audioBlob);
  reader.onloadend = async function () {
    let base64 = reader.result.split(",")[1];
    console.log("Base64 Audio:", base64);
    await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: true,
        type: "audio",
        content: base64,
      }
    );
  };

  // Update UI: update chats and set current chat uid
  await updateChats();
  setCurrentChatUid(newChatDoc.id);
  console.log("3111111111");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Create separate FormData for the audio feedback endpoint
  var dataAudio = new FormData();
  dataAudio.append("audio", audioBlob, "audio");

  // Send audio to /feedback/audio
  const URL = `${BACKEND_URL}/feedback/audio`;
  console.log(URL);
  console.log(data);
  const response = await fetch(URL, {
    method: "POST",
    body: dataAudio,
  });
  if (response.ok) {
    const json = await response.json();
    print("json");
    print(json);
    await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: false,
        type: "audioResponse",
        content: JSON.stringify(audioFeedback),
      }
    );
  } else {
    console.log("ERROR on /feedback/audio");
    console.log(response.status);
    console.log(await response.json());
    console.log(response.statusText);
  }
  console.log("3131");

  // Create separate FormData for the vocal feedback endpoint
  var dataVocal = new FormData();
  dataVocal.append("vocal", audioBlob, "vocal");

  const URL2 = `${BACKEND_URL}/feedback/vocal`;
  const response2 = await fetch(URL2, {
    method: "POST",
    body: dataVocal,
  });
  if (response2.ok) {
    const json2 = await response2.json();
    console.log("2222"); // Log indicates success on /feedback/vocal
    let vocalFeedback = safeParseFeedback(json2.feedback || "No vocal feedback provided");
    await addDoc(
      collection(db, `users/${userId}/chats/${newChatDoc.id}/messages`),
      {
        time: Date.now(),
        fromUser: false,
        type: "audioResponse",
        content: JSON.stringify(vocalFeedback),
      }
    );
  } else {
    console.log("ERROR on /feedback/vocal");
    console.log(response2.status);
    console.log(response2.statusText);
  }
};

export const getCollection = async (collectionName) => {
  const querySnap = await getDocs(collection(db, collectionName));
  return querySnap.docs.map((docSnap) => ({ ...docSnap.data(), docId: docSnap.id }));
};

// ... other firestore functions (update, delete, etc.)
