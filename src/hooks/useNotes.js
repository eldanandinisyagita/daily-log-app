import { useState, useEffect } from "react";

function useNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(text, deadline) {
    setNotes([...notes, { id: Date.now(), type: "note", text, deadline }]);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  const sortedNotes = [...notes].sort((a, b) =>
    a.deadline.localeCompare(b.deadline)
  );

  return { sortedNotes, addNote, deleteNote };
}

export default useNotes;