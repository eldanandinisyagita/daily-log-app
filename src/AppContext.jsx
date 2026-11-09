import { createContext, useContext } from "react";
import useLogs from "./useLogs";
import useNotes from "./useNotes";

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