import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import TodayPage from "./pages/TodayPage";
import HistoryPage from "./pages/HistoryPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<TodayPage />} />
        <Route path="/history/:range" element={<HistoryPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Route>
    </Routes>
  );
}

export default App;