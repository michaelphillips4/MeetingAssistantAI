import { useState, useRef } from "react";
import { Button } from "@aws-amplify/ui-react";
import SpeechToText from "./SpeechToText";
import RecordingMessage from "./RecordingMessage";

const mimeType = "audio/mp4";

const AudioRecorder = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const data = useRef<Blob[]>([]);

  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");

  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const [isListening, setIsListening] = useState<boolean>(false);

  const startRecording = async () => {
    setIsListening(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(mediaStream, { mimeType });

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          data.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(data.current, { type: mimeType });
        const audioUrl = window.URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.current.start();
      setRecordingStatus("recording");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setRecordingStatus("inactive");
      setIsListening(false);
    }
  };

  const ShowRecordStatusButton = () => {
    if (recordingStatus === "inactive") {
      return (
        <Button
          onClick={startRecording}
          type="button"
          variation="primary"
          colorTheme="overlay"
        >
          Start Recording
        </Button>
      );
    }

    return (
      <>
        <Button
          onClick={stopRecording}
          type="button"
          variation="primary"
          colorTheme="overlay"
        >
          Stop Recording
        </Button>
        <RecordingMessage />
      </>
    );
  };

  return (
    <>
      <div className="audio-controls">
        <ShowRecordStatusButton />
      </div>
      {audioUrl != null && (
        <div className="audio-player">
         <p>
          <audio
            src={audioUrl}
            controls
            onPlaying={() => setIsListening(false)}
          ></audio>
          </p>
            <a download href={audioUrl}>
              Download Recording
            </a>
         
        </div>
      )}

      <SpeechToText isListening={isListening} />
    </>
  );
};

export default AudioRecorder;
