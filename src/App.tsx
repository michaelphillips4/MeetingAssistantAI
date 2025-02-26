import "./App.css";
import AudioRecorder from "./AudioRecorder";
import AI from "./AI";
import Notes from "./Notes";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <>
      <header>
        <Authenticator>
          {({ signOut }) => (
            <h1>
              Meeting Assistant
              <button
                style={{ float: "right", fontSize: "small" }}
                onClick={signOut}
              >
                Sign out
              </button>
            </h1>
          )}
        </Authenticator>
      </header>
      <main className="main-content">
        <div className="main-content-left">
          <section>
        <h2>AI</h2>
          <AI />
         </section>
         <section>
          <h2>Notes</h2>
          <Notes /></section>
        </div>
        <div className="main-content-right">
          <section>
            <h2>Audio Recorder</h2>
          <AudioRecorder />
          </section>
          
        </div>
      </main>
    </>
  );
}

export default App;
