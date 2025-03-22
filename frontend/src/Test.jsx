import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Test() {
  const constraints = { audio: true };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // use later
  let mediaRecorder;
  let recordedChunks;
  const audioRef = useRef();
  const [feedback, setFeedback] = useState("");

  function handleDataAvailable(event) {
    console.log("handleDataAvailable", event);
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  }

  function setPlay(blob) {
    audioRef.current.src = null;
    audioRef.current.srcObject = null;
    audioRef.current.src = window.URL.createObjectURL(blob);
    audioRef.current.controls = true;
    // audioRef.current.play();
  }

  async function startRecording() {
    recordedChunks = [];
    // var options = { mimeType: "video/webm;codecs=vp9,opus" };
    // console.log(navigator.mediaDevices.getUserMedia(constraints));
    await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      try {
        console.log(stream);
        mediaRecorder = new MediaRecorder(stream);
        console.log(mediaRecorder.state);
      } catch (e) {
        console.error("Exception while creating MediaRecorder:", e);
        return;
      }
    });
    // var mediaRecorder = new MediaRecorder(
    //   navigator.mediaDevices.getUserMedia(constraints),
    //   options
    // );
    // console.log(mediaRecorder);
    console.log("reached here");
    mediaRecorder.onstop = (event) => {
      console.log("Recorder stopped: ", event);
      console.log("Recorded Blobs: ", recordedChunks);
      // set audio playback
      const superBuffer = new Blob(recordedChunks, {
        type: "audio/ogg; codecs=opus",
      });
      setPlay(superBuffer);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log("MediaRecorder started", mediaRecorder.state);
  }

  function stopRecording() {
    // console.log("i am in stop");
    mediaRecorder.stop();
    console.log("MediaRecorder stopped", mediaRecorder.state);
  }

  // will make request to flask backend
  function handleAnalyze() {
    const audioBlob = new Blob(recordedChunks, {
      type: "audio/ogg; codecs=opus",
    });

    // upload form data
    var data = new FormData();
    data.append("file", audioBlob, "file");
    // console.log(data["file"]);
    // const contents = {
    //   feedback: "testing",
    // };

    const URL = `${BACKEND_URL}/feedback/`;
    fetch(URL, {
      method: "POST",
      headers: {
        // "Content-Type": "audio/ogg",
        // "Access-Control-Allow-Origin": "*",
      },
      body: data,
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        setFeedback(data.feedback);
      });
    // fetch(URL, {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.ok) return response.json();
    //   })
    //   .then((data) => {
    //     setFeedback(data.data);
    //   });
  }

  return (
    <>
      <div className="container">
        <button onClick={() => startRecording()}>Start</button>
        <button onClick={() => stopRecording()}>Stop</button>
        <input id="upload" type="file" />
      </div>
      <audio ref={audioRef} controls id="beep"></audio>
      <br></br>
      <button onClick={() => handleAnalyze()}>Analyze</button>
      <div>{feedback}</div>
    </>
  );
}

export default Test;
