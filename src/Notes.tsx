import { useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import { RiDeleteBin5Fill } from "react-icons/ri";

type Note = {
  key: number;
  title: string;
  des: string;
};

function Notes() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [count, setCount] = useState(4);

  function remove(id: number) {
    setNotes(notes.filter((e) => e.key !== id));
  }

  function handle() {
    setNotes([...notes, { key: count, title: title, des: des }]);
    setCount(count + 1);
    setTitle("");
    setDes("");
    console.log(notes);
  }

  return (
    <div className="notes">
      <div>
        <input
          type="text"
          id="title"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <textarea
          id="description"
          placeholder="Notes"
          value={des}
          onChange={(e) => {
            setDes(e.target.value);
          }} style={{"marginBottom":"0px"}}
        ></textarea>

        <Button  variation="primary"
          colorTheme="overlay" type="submit" onClick={handle}>
          Add Note
        </Button>
      </div>
      <div>
        <ol>
          {notes.map((e, i) => (
            <li key={i}>
              <article className="message">
              <b>{e.title}</b>  <span
           onClick={() => remove(e.key)}>
               <RiDeleteBin5Fill />
              </span>
              <p>{e.des}</p>
            
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Notes;
