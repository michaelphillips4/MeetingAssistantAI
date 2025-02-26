import { useEffect, useState } from "react";

const SpeechToText = ({ isListening }: { isListening: boolean }) => {
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    console.log("useEffect start", isListening);

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    let c = 1;
    let out: string[] = [];
    recognition.onresult = (e: Event) => {
     
      const speechEvent = e as SpeechRecognitionEvent;
      console.log(speechEvent.results);
       out = [];
      for (const result of speechEvent.results) {
        let text = result[0].transcript;

        if (result.isFinal) {
          text += ".";
        }
        out.push(text);
      }
      setTranscript([...transcript, ...out]);
      console.log(c, "on result ", transcript, "text ");
    };

    if (isListening ===true) {
      console.log("start");
      recognition.start();
    } else {
      console.log("stop");
      recognition.stop();
    }

    return () => {
      console.log("end");
      // recognition.stop();
    };
  }, [isListening]);

  return (
    <>
    {/* {isListening.toString()} */}
      {transcript.map((p, i) => (
        <p key={i} style={{ textTransform: "capitalize" }}>
          {p}
        </p>
      ))}
    </>
  );
};

export default SpeechToText;
