import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

const LABELS = {day: "Per Hari", week: "Per minggu", month: "Per bulan"};

function getWeekStart(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay(); // 0 = Minggu
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d.toLocaleDateString("en-CA");
}

function getGroupKey(date, range) {
    if (range === "week") return getWeekStart(date);
    if (range === "month") return date.slice(0,7);
    return date;
}

function HistoryPage() {
    const { logs } = useApp();
    const { range } = useParams();
    

    if(!LABELS[range]) return <p>Halaman Tidak ditemukan</p>;

    const groups = {};
    logs.forEach((log) => {
        const key = getGroupKey(log.date, range);
        if (!groups[key]) groups[key] = [];
        groups[key].push(log);
    });

    const keys = Object.keys(groups).sort().reverse();

    return (
        <div>
            <h1>Riwayat {LABELS[range]}</h1>
            {keys.length === 0 && <p>Belum ada log.</p>}

            {keys.map((key) => {
                const items = groups[key];
                const done = items.filter((log) => log.completed).length;

                return (
                <section key={key}>
                    <h3>
                    {range === "week" ? `Minggu mulai ${key}` : key}
                    {" "}({done}/{items.length} selesai)
                    </h3>
                    <ul>
                    {items.map((log) => (
                        <li
                        key={log.id}
                        style={{
                            marginLeft: log.parentId ? 24 : 0,
                            textDecoration: log.completed ? "line-through" : "none",
                        }}
                        >
                        {log.text}
                        </li>
                    ))}
                    </ul>
                </section>
                );
            })}

        </div>
    );
}

export default HistoryPage;