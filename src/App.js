import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import axios from 'axios';

function App() {
    const [notesList, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:3001/notes').then((res) => {
            console.log('promise fufilled');
            setNotes(res.data);
        });
    }, []);

    console.log('render', notesList.length, 'notes');

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
