import { useState } from "react";

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
          }}
        ></textarea>
<br />
        <button type="submit" onClick={handle}>
          Add Note
        </button>
      </div>
      <div>
        <ol>
          {notes.map((e, i) => (
            <li key={i}>
              <h4>Title: {e.title}</h4>
              <p>Note: {e.des}</p>
              <button type="button" onClick={() => remove(e.key)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Notes;
