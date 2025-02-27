import "./App.css";
import AudioRecorder from "./AudioRecorder";
import AI from "./AI";
import Notes from "./Notes";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <>
     <main >
      <header>
        <Authenticator>
          {({ signOut }) => (
           <>
              <button
                style={{ float: "right", fontSize: "small" }}
                onClick={signOut}
              >
                Sign out
              </button>
            <h1 className="center">
              Meeting Assistant </h1></>
          )}
        </Authenticator>
      </header>
     <div className="main-content">
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
        </div>
      </main>
    </>
  );
}

export default App;
