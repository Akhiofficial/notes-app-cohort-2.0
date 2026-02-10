import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  // print the notes from the api call to thee froonted
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  const fetchednotes = ()=> {
    axios.get("https://notes-app-cohort-2-0.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
} 

// saves from rendering the api call on every render, only runs once when the component mounts
useEffect(() => {
  fetchednotes();
}, [])

// post the notes
const handeSubmit = (e)=>{
  e.preventDefault();
  const {title, description} = e.target.elements;
  console.log(title.value,description.value);

  axios.post("https://notes-app-cohort-2-0.onrender.com/api/notes", {
    title: title.value,
    description: description.value
  }).then((res)=>{
    console.log(res.data);
    fetchednotes();
  })
}

// delete the notes 
const haandleDeleeteNte = (id) => {
  axios.delete(`https://notes-app-cohort-2-0.onrender.com/api/delete/${id}`)
  .then(res=>  {
    console.log(res.data);
    fetchednotes();
  })
}

// update the notes 
const haandleUpdateNte = (id) => {
  axios.patch(`https://notes-app-cohort-2-0.onrender.com/api/notes/${id}`, {
    title: editTitle,
    description: editDescription
  }).then(res => {
    console.log(res.data);
    fetchednotes();
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  })
} 



  return (
    <>
    <form className="note-creeate-form" onSubmit={handeSubmit}>
      <input name="title" type="text" placeholder="Enter the title" />
      <input name="description" type="text" placeholder="Enter the description" />
      <button>Create note</button>
    </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              {editingId === note._id ? (
                <>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  <input 
                    type="text" 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Edit description"
                  />
                  <button onClick={() => haandleUpdateNte(note._id)}>Save</button>
                  <button onClick={() => {
                    setEditingId(null);
                    setEditTitle("");
                    setEditDescription("");
                  }}>Cancel</button>
                </>
              ) : (
                <>
                  <h2>{note.title}</h2>
                  <p>{note.description}</p>
                  <button onClick={() => haandleDeleeteNte(note._id)}>X</button>
                  <button onClick={() => {
                    setEditingId(note._id);
                    setEditTitle(note.title);
                    setEditDescription(note.description);
                  }}>Edit</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
