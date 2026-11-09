import { useState, useEffect } from "react";

function getToday() {
  return new Date().toLocaleDateString("en-CA"); // hasilnya "2026-08-11"
}

function useLogs() {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("logs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  function addLog(text, parentId = null) {
    setLogs([
      ...logs,
      {
        id: Date.now(),
        type: "log",
        text,
        completed: false,
        date: getToday(),
        parentId,
      },
    ]);
  }

  function toggleLog(id) {
    setLogs(
      logs.map((log) =>
        log.id === id ? { ...log, completed: !log.completed } : log
      )
    );
  }

  function editLog(id, newText) {
    setLogs(
      logs.map((log) => (log.id === id ? { ...log, text: newText } : log))
    );
  }

  function deleteLog(id) {
    setLogs(logs.filter((log) => log.id !== id && log.parentId !== id));
  }

  const todayLogs = logs.filter((log) => log.date === getToday());
  const mainLogs = todayLogs.filter((log) => log.parentId === null);

  function getSubLogs(parentId) {
    return todayLogs.filter((log) => log.parentId === parentId);
  }

  return { logs, mainLogs, getSubLogs, addLog, toggleLog, editLog, deleteLog };
}

export default useLogs;