import { useEffect, useState } from "react";

// Declare missing types for SpeechRecognition
interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}




const SpeechToText = ({ isListening }: { isListening: boolean }) => {
  const [transcript, setTranscript] = useState<string>("");


  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;


    let c = 1;

    recognition.onresult = (e: Event) => {
      const speechEvent = e as SpeechRecognitionEvent;
      let text = Array.from(speechEvent.results)
        .map((result) => result[0].transcript)
        .join("");
        c++;
        text = transcript + text; 
        setTranscript(text);
      console.log(c,"on result ",transcript, "text ", text)
      
    };

    // recognition.onend = () => {

    //   if (isListening) recognition.start(); // Restart if still listening
    // };

    if (isListening) {
      console.log("start")
      recognition.start();
    } else {
      console.log("stop")
      recognition.stop();
    }

    return () => {
      console.log("end")
     // recognition.stop();

    };
  }, [isListening]);

  return (
       
      <p>{isListening}{transcript}</p>
  );
};

export default SpeechToText;
