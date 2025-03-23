import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { b64toBlob } from "../services/audio";
import "./../index.css";
import "./DashboardChat.css";

function DashboardChat({ chat }) {
  return (
    <>
      <div className="dashboard-chat">
        {chat.map((message) => {
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
            return <AudioPlayer src={b64toBlob(message.content)} />;
          }
          if (message.type === "audioResponse") {
            const data = JSON.parse(message.content);
            return (
              <div className="message bot">
                {Object.keys(data).map((key) => {
                  return (
                    <>
                      <h3>{key}</h3>
                      <p>{data[key]}</p>
                    </>
                  );
                })}
              </div>
            );
          }
        })}
        <textarea name="" id="input-field" defaultValue={"Input"} />
      </div>
    </>
  );
}

export default DashboardChat;
