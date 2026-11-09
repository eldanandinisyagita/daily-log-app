import { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "./icons";

function LogItem({ log, subLogs = [], isSub = false, onToggle, onDelete, onEdit, onAddSub }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(log.text);
  const [isAddingSub, setIsAddingSub] = useState(false);
  const [subText, setSubText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function cancelEdit() {
    setEditText(log.text);
    setIsEditing(false);
  }

  function cancelSub() {
    setSubText("");
    setIsAddingSub(false);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    if (editText.trim() === "") return;
    onEdit(log.id, editText);
    setIsEditing(false);
  }

  function handleSubSubmit(e) {
    e.preventDefault();
    if (subText.trim() === "") return;
    onAddSub(subText, log.id);
    cancelSub();
  }

  return (
    <li className={`log-item ${isSub ? "is-sub" : ""}`}>
      <div className="log-row">
        {isEditing ? (
          <form className="log-edit" onSubmit={handleEditSubmit}>
            <input
              className="inline-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && cancelEdit()}
              autoFocus
            />
            <button type="submit" className="link-btn">simpan</button>
            <button type="button" className="link-btn" onClick={cancelEdit}>batal</button>
          </form>
        ) : (
          <>
            <span className={`log-text ${log.completed ? "done" : ""}`}>
              {log.text}
            </span>
            <button
              type="button"
              className={`dot ${log.completed ? "dot-done" : ""}`}
              onClick={() => onToggle(log.id)}
              aria-label="Tandai selesai"
            />
            <button
              type="button"
              className="more-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              •••
            </button>
          </>
        )}
      </div>

      {isMenuOpen && !isEditing && (
        <div className="log-menu">
          <button
            type="button"
            aria-label="Edit"
            onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
          >
            <PencilIcon />
          </button>
          {!isSub && (
            <button
              type="button"
              aria-label="Tambah sub-log"
              onClick={() => { setIsAddingSub(true); setIsMenuOpen(false); }}
            >
              <PlusIcon />
            </button>
          )}
          <button type="button" aria-label="Hapus" onClick={() => onDelete(log.id)}>
            <TrashIcon />
          </button>
        </div>
      )}

      {isAddingSub && (
        <form className="sub-form" onSubmit={handleSubSubmit}>
          <input
            className="inline-input"
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && cancelSub()}
            placeholder="add sub log ..."
            autoFocus
          />
        </form>
      )}

      {subLogs.length > 0 && (
        <ul className="sub-list">
          {subLogs.map((sub) => (
            <LogItem
              key={sub.id}
              log={sub}
              isSub
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default LogItem;