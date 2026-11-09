import { useState } from "react";

function LogForm({ onAdd, onOpenModal }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    onAdd(inputValue);
    setInputValue("");
  }

  return (
    <form className="add-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="add task log ..."
      />
      <button
        type="button"
        className="add-bar-btn"
        onClick={onOpenModal}
        aria-label="Add activity"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </button>
    </form>
  );
}

export default LogForm;