import { useState, useRef } from "react";
import { Button } from "@aws-amplify/ui-react";
const mimeType = "audio/webm";

const AudioRecorder = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");

  const [audioUrls, setAudioUrls] = useState<string[]>([]);


  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        mediaRecorder.current = new MediaRecorder(mediaStream, { mimeType });
        mediaRecorder.current.ondataavailable = ondataavailableHandler ;
        setPermission(true);
        console.log("currentRecorder set ", mediaRecorder.current);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };


  const ondataavailableHandler = (event: BlobEvent) => {
    console.log("data available event",event);

    if (event.data.size > 0) {
      const audioBlob = new Blob([event.data], { type: mimeType });
      const audioUrl = window.URL.createObjectURL(audioBlob);
      setAudioUrls((audioUrls) => [...audioUrls,audioUrl]);
      console.log("blob created", audioUrls, audioUrl);
    
    }
  };
 
  const startRecording = () => {
    console.log("start recording running ...");
    
    if (mediaRecorder.current) {
      mediaRecorder.current.start(3000);
      setRecordingStatus("recording");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    
  };

  return (
    <>
      <div className="audio-controls">
        {!permission && (
          <Button
            onClick={getMicrophonePermission}
            type="button"
            variation="primary"
            colorTheme="overlay"
          >
            Get Microphone
          </Button>
        )}

        {permission && recordingStatus === "inactive" && (
          <Button
            onClick={startRecording}
            type="button"
            variation="primary"
            colorTheme="overlay"
          >
            Start Recording
          </Button>
        )}

        {recordingStatus === "recording" && (
          <>
            <Button
              onClick={stopRecording}
              type="button"
              variation="primary"
              colorTheme="overlay"
            >
              Stop Recording
            </Button>
            <span> {recordingStatus} </span>
          </>
        )}
      </div>

      <ol>
        {audioUrls.map((url, i) => (
          <li key={i}>
            <div className="audio-player">
              <br />
              <audio src={url} controls></audio>
              <br />
              <a download href={url}>
                Download Recording
              </a>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default AudioRecorder;
