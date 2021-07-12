import React from 'react';
import { useState } from 'react';
import './App.css';
import Note from './components/Note';

function App(props) {
    const [notesList, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notesList.length + 1,
        };

        setNotes(notesList.concat(noteObject));
        setNewNote('');
    };

    const handleNoteChange = (e) => {
        console.log(e.target.value);
        setNewNote(e.target.value);
    };

    const notesToShow = showAll
        ? notesList
        : notesList.filter((note) => note.important === true);

    return (
        <div className="App">
            <h1>Notes</h1>

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save Note</button>
            </form>
        </div>
    );
}

export default App;
