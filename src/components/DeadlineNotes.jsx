import { useApp } from "../context/AppContext";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DeadlineNotes({ className = ""}) {
  const { sortedNotes, deleteNote } = useApp();

  return (
    <aside className={`${className} aside-right`}> 
      <h2 className="side-title">Deadline notes</h2>
      {sortedNotes.length === 0 && (
        <p className="muted">Belum ada deadline.</p>
      )}
      <ul className="deadline-list">
        {sortedNotes.map((note) => (
        <li key={note.id}>
          <span className="deadline-date">{formatDate(note.deadline)}</span>
          {note.title && <strong className="deadline-title">{note.title}</strong>}
          {note.text && <span className="deadline-text">{note.text}</span>}
          <button className="link-btn" onClick={() => deleteNote(note.id)}>
            hapus
          </button>
        </li>
        ))}
      </ul>
    </aside>
  );
}

export default DeadlineNotes;