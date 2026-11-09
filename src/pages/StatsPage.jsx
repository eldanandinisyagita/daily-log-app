import { useApp } from "../context/AppContext";

const RANGE_DAYS = 14;

function formatDate(d) {
  return d.toLocaleDateString("en-CA"); // "2026-10-15", waktu lokal
}

function StatsPage() {
  const { logs } = useApp();

  // 1. Hitung jumlah log utama per tanggal
  const totalByDate = {};
  const doneByDate = {};
  logs.forEach((log) => {
    if (log.parentId !== null) return; // sub-log nggak dihitung
    totalByDate[log.date] = (totalByDate[log.date] || 0) + 1;
    if (log.completed) {
      doneByDate[log.date] = (doneByDate[log.date] || 0) + 1;
    }
  });

  // 2. Susun data 14 hari terakhir (termasuk hari tanpa log)
  const data = [];
  for (let i = RANGE_DAYS - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = formatDate(d);
    data.push({
      date: key,
      total: totalByDate[key] || 0,
      done: doneByDate[key] || 0,
    });
  }

  // 3. Statistik
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const activeDays = data.filter((d) => d.total > 0).length;
  const percent = Math.round((activeDays / RANGE_DAYS) * 100);

  let streak = 0;
  const cursor = new Date();
  if (!totalByDate[formatDate(cursor)]) cursor.setDate(cursor.getDate() - 1);
  while (totalByDate[formatDate(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return (
    <div>
      <h1>Konsistensi Log</h1>
      <p>Streak: {streak} hari berturut-turut</p>
      <p>
        Aktif {activeDays} dari {RANGE_DAYS} hari terakhir ({percent}%)
      </p>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
        {data.map((d) => (
          <div key={d.date} style={{ flex: 1, textAlign: "center" }}>
            <div
              title={`${d.date}: ${d.done}/${d.total} selesai`}
              style={{
                height: Math.max((d.total / maxTotal) * 100, 4),
                background: "var(--muted)",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {d.total > 0 && (
                <div
                  style={{
                    height: `${(d.done / d.total) * 100}%`,
                    background: "var(--text)",
                  }}
                />
              )}
            </div>
            <small>{d.date.slice(8)}</small>
          </div>
        ))}
      </div>
      <p>
        <small>Tinggi bar = jumlah log, bagian hijau = yang sudah selesai.</small>
      </p>
    </div>
  );
}

export default StatsPage;