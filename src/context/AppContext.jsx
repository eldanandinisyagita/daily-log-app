import { createContext, useContext } from "react";
import useLogs from "../hooks/useLogs";
import useNotes from "../hooks/useNotes";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const logsData = useLogs();
  const notesData = useNotes();

  return (
    <AppContext.Provider value={{ ...logsData, ...notesData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useApp harus dipakai di dalam <AppProvider>");
  }
  return context;
}