import { useState } from 'react';
import { dummyNotesList } from './constants'; 
import { Label } from "./types";
import { ThemeContext, themes } from "./ThemeContext";


export const StickyNotes = () => {
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.other,
        favorite: false,
      };
    
      const [notes, setNotes] = useState(dummyNotesList); 
      const [createNote, setCreateNote] = useState(initialNote);
      const [currentTheme, setCurrentTheme] = useState(themes.light);
    
      const createNoteHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", createNote.title);
        console.log("content: ", createNote.content);
        createNote.id = notes.length + 1;
        setNotes([createNote, ...notes]);
        setCreateNote(initialNote);
      };
    
      const handleDeleteNote = (id: number) => {
        const filteredNotes = notes.filter(note => note.id !== id);
        setNotes(filteredNotes);
      };
    
      const handleFavoriteToggle = (id: number) => {
        const updatedNotes = notes.map(note => {
          if (note.id === id) {
            return { ...note, favorite: !note.favorite };
          }
          return note;
        });
        setNotes(updatedNotes);
      };
    
      const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
      };
      
      return (
        <div className='app-container' style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}>
          <form className="note-form" onSubmit={createNoteHandler}>
            <div>
              <input
                placeholder="Note Title"
                onChange={(event) =>
                  setCreateNote({ ...createNote, title: event.target.value })}
      
                required>
              </input>
            </div>
      
            <div>
              <textarea
                placeholder="Note Content"  
                onChange={(event) =>
                  setCreateNote({ ...createNote, content: event.target.value })}
                required>
              </textarea>
            </div>
      
            <div>
             <select
               onChange={(event) =>
                 setCreateNote({ ...createNote, label: event.target.value as Label })}
               required>
               <option value={Label.personal}>Personal</option>
               <option value={Label.study}>Study</option>
               <option value={Label.work}>Work</option>
               <option value={Label.other}>Other</option>
             </select>
           </div>
      
            <div><button type="submit">Create Note</button></div>
          </form>
      
          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-item"
                contentEditable="true"
                style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
              >
                <div className="notes-header">
                <button onClick={() => handleFavoriteToggle(note.id)}>{note.favorite ? '❤️' : '🤍'} </button>
                <button onClick={() => handleDeleteNote(note.id)}>x</button>
                </div>
                <h2> {note.title} </h2>
                <p> {note.content} </p>
                <p> {note.label} </p>
              </div>
            ))}
          </div>
    
          <div className="favorite-notes">
            <h2>Favorite Notes:</h2>
            <ul>
              {notes.filter(note => note.favorite).map((note) => (
                <li key={note.id}> {note.title}</li> 
              ))}
            </ul>
          </div>
          <button onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>  
      );
    }