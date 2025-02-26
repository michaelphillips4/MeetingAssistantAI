import { useState, useRef,useEffect } from "react";
import { Button } from "@aws-amplify/ui-react";
import SpeechToText from "./SpeechToText";

const mimeType = "audio/webm";

const AudioRecorder = () => {

  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const data = useRef<Blob[]>([]);

  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording"
  >("inactive");

  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const [isListening, setIsListening] = useState<boolean>(false);

  const [count, setCount] = useState(0);

    useEffect(() => {
       
        const interval = setInterval(() => {
              setCount(count === 3 ? 0 :count +1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);



  const startRecording = async () => {
   console.log("start recording running ...");
   setIsListening(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(mediaStream, { mimeType });

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        console.log("data available event", event);
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
          <span> {recordingStatus}{".".repeat(count)}</span>
        
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
          {isListening.toString()}
          <br />
          <audio src={audioUrl} controls onPlaying={()=>setIsListening(false)}></audio>
          <br />
          <a download href={audioUrl} >
            Download Recording
          </a>
        </div>
      )}

      <SpeechToText isListening={isListening}/>

    </>
  );
};

export default AudioRecorder;
