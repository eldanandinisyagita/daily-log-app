import { useState } from "react";
import { useApp } from "./AppContext";
import TodoForm from "./TodoForm";
import LogItem from "./LogItem";
import AddActivityModal from "./AddActivityModal";

function TodayPage() {
  const { mainLogs, getSubLogs, addLog, toggleLog, editLog, deleteLog, addNote } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doneCount = mainLogs.filter((log) => log.completed).length;
  const todayLabel = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <h2 className="card-title">Today's Log</h2>
      <p className="card-date">date: {todayLabel}</p>
      <p className="card-progress">{doneCount}/{mainLogs.length} selesai hari ini</p>

      {mainLogs.length === 0 && (
        <p className="muted">Belum ada log hari ini. Yuk mulai catat!</p>
      )}
      <ul className="log-list">
        {mainLogs.map((log) => (
          <LogItem
            key={log.id}
            log={log}
            subLogs={getSubLogs(log.id)}
            onToggle={toggleLog}
            onDelete={deleteLog}
            onEdit={editLog}
            onAddSub={addLog}
          />
        ))}
      </ul>

      <TodoForm onAdd={addLog} onOpenModal={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <AddActivityModal
          onClose={() => setIsModalOpen(false)}
          onAddLog={addLog}
          onAddNote={addNote}
        />
      )}
    </div>
  );
}

export default TodayPage;