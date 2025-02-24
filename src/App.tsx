import { FormEvent, useState, } from "react";
import {
  Loader,
  Placeholder,
  Button,
} from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

  

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);



  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {

      const formData = new FormData(event.currentTarget);
 
      const temp = `${formData.get("question")?.toString() || ""}`; 

      const { data, errors } = await amplifyClient.queries.askBedrock({
        question: [temp],
      });

      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.log(errors);
      }
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">Meeting Assistant</h1>
           </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
         
          <input
            type="text"
            className="wide-input"
            id="question"
            name="question"
            placeholder="Type question here ..."
          />
          <Button type="submit" variation="primary" colorTheme="overlay">
            Ask AI a Question
          </Button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
      {/* <footer>v1 by Michael Phillips <a href="http:\\www.area2.co.uk">home</a></footer> */}
    </div>
  );
}

export default App;
