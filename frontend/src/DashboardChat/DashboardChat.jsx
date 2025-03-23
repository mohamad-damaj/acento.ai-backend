import React from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { b64toBlob } from "../services/audio";
import "./../index.css";
import "./DashboardChat.css";

function DashboardChat({ chat }) {
  return (
    <div className="dashboard-chat">
      {chat.map((message) => {
        // Each returned element uses a key from message.docId
        if (message.type === "normal") {
          return (
            <div
              key={message.docId}
              className={`message ${message.fromUser ? "user" : "bot"}`}
            >
              {message.content}
            </div>
          );
        }
        if (message.type === "audio") {
          return <AudioPlayer key={message.docId} src={b64toBlob(message.content)} />;
        }
        if (message.type === "audioResponse") {
          let data;
          try {
            // If the Python dictionary string isn't valid JSON (e.g. uses single quotes),
            // you can replace them. (This is a workaround; ideally the backend returns valid JSON.)
            const fixedString = message.content.replace(/'/g, '"');
            data = JSON.parse(fixedString);
          } catch (error) {
            console.error("Error parsing audioResponse JSON", error);
            data = {};
          }
          return (
            <div key={message.docId} className="message bot">
              {Object.keys(data).map((key) => (
                <React.Fragment key={key}>
                  <h3>{key}</h3>
                  <p>{data[key]}</p>
                </React.Fragment>
              ))}
            </div>
          );
        }
        // Fallback: return nothing if type doesn't match.
        return null;
      })}
    </div>
  );
}

export default DashboardChat;
