import { useEffect, useRef, useState } from "react";
import { ChevronIcon, PlusCircleIcon, CheckCircleIcon } from "./icons";

function AddActivityModal({ onClose, onAddLog, onAddNote }) {
  const [type, setType] = useState("log");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const textRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function save(closeAfter) {
    if (type === "log") {
      if (text.trim() === "") return;
      onAddLog(text);
    } else {
      if (title.trim() === "" || deadline === "") return;
      onAddNote(title, text, deadline);
    }

    if (closeAfter) {
      onClose();
    } else {
      setTitle("");
      setText("");
      setDeadline("");
      const target = type === "note" ? titleRef : textRef;
      target.current.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    save(true);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add Activity</h2>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="log">Add log</option>
              <option value="note">Add note</option>
            </select>
            <span className="chevron">
              <ChevronIcon />
            </span>
          </div>

          {type === "note" && (
            <>
              <div className="modal-field">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <input
                  ref={titleRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add heading"
                />
              </div>
            </>
          )}

          <div className="modal-field">
            <input
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={type === "log" ? "Add log activity" : "Add note"}
              autoFocus
            />
            <div className="modal-actions">
              <button
                type="button"
                aria-label="Simpan dan tambah lagi"
                onClick={() => save(false)}
              >
                <PlusCircleIcon />
              </button>
              <button type="submit" aria-label="Simpan">
                <CheckCircleIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivityModal;