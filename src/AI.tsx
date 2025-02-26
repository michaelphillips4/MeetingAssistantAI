import { FormEvent, useState } from "react";
import { Loader, Placeholder} from "@aws-amplify/ui-react";
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

function AI() {
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
<>
      <form onSubmit={onSubmit} className="form-container">

       
          <input
            type="text"
            className="wide-input"
            id="question"
            name="question"
            placeholder="Type question here ..." style={{"marginRight":"10px"}}
          />
 
          <button type="submit" >
            Ask AI a Question
          </button>
     
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
          result && <blockquote>{result}</blockquote>
        )}
      </div>
</>
  );
}

export default AI;
