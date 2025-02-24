import "./App.css";
import AudioRecorder from "./AudioRecorder";
import AI from "./AI";

function App() {
  return (
    <>
      <h1>Meeting Assistant</h1>

      <details>
        <summary>Audio Recorder</summary>
        <AudioRecorder />
      </details>

      <details>
        <summary>AI</summary>
        <AI />
      </details>
    </>
  );
}

export default App;
