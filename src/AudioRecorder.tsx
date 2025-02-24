import { useState, useRef } from "react";
import { Button } from "@aws-amplify/ui-react";
const mimeType = "audio/webm";

const AudioRecorder: React.FC = () => {
  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording">("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (!stream) return;
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  return (
    <div className="form-container">
        <div className="audio-controls">
          {!permission && (
            <Button onClick={getMicrophonePermission} type="button" variation="primary" colorTheme="overlay">
              Get Microphone
            </Button>
          )}
          {permission && recordingStatus === "inactive" && (
            <Button onClick={startRecording} type="button" variation="primary" colorTheme="overlay" >
              Start Recording
            </Button>
          )}
          {recordingStatus === "recording" && (
<>
            <Button onClick={stopRecording} type="button" variation="primary" colorTheme="overlay" >
              Stop Recording
            </Button>  <span>Recording ...</span></>
                    )}
        </div>
        {audio && (
          <div className="audio-player">
            <br />
            <audio src={audio} controls></audio>
            <br /><a download href={audio}>
              Download Recording
            </a>
          </div>
        )}
     
    </div>
  );
};

export default AudioRecorder;
