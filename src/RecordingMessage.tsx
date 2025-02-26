import { useState,useEffect } from "react";

const RecordingMessage = () => {
 
  const [count, setCount] = useState(0);

    useEffect(() => {
       
       const interval = setInterval(() => {
             setCount(count === 3 ? 0 :count +1);
       }, 1000);
       return () => clearInterval(interval);
    }, [count]);

    return (

          <span> Recording {".".repeat(count)}</span>

    );
  };

export default RecordingMessage;
