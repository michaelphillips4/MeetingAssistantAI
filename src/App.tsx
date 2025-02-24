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

      <details>
        <summary>Notes</summary>
        TODO add notes
      </details>

    </>
  );
}

export default App;
