import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/notes"; // change later when deployed

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!title || !content) return alert("Enter both fields");

    await axios.post(API, { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Notes App</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={addNote}>Add Note</button>

      <hr />

      {notes.map((note) => (
        <div key={note._id} style={{ marginBottom: "15px" }}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
