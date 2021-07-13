import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './services/notes';
import axios from 'axios';

function App() {
    const [notesList, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    const toggleImportance = (id) => {
        const note = notesList.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notesList.map((note) =>
                        note.id !== id ? note : returnedNote
                    )
                );
            })
            .catch((error) => {
                alert(
                    `the note ${note.content} was already deleted from the server.`
                );
                setNotes(notesList.filter((n) => n.id !== id));
            });
    };

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notesList.length + 1,
        };

        noteService.create(noteObject).then((returnedNote) => {
            setNotes(notesList.concat(returnedNote));
            setNewNote('');
        });
    };

    const handleNoteChange = (e) => {
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
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                    />
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
