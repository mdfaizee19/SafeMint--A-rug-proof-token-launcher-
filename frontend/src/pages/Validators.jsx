import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const validators = [
  { name: "Haroon", trust: "GREEN", uptime: 99.8 },
  { name: "mainnet", trust: "YELLOW", uptime: 97.4 },
  { name: "Josh", trust: "RED", uptime: 92.1 },
]

// Simulated network uptime trend (last 7 days)
const uptimeData = [
  { day: "Mon", uptime: 99.6 },
  { day: "Tue", uptime: 99.7 },
  { day: "Wed", uptime: 99.8 },
  { day: "Thu", uptime: 99.5 },
  { day: "Fri", uptime: 99.9 },
  { day: "Sat", uptime: 99.7 },
  { day: "Sun", uptime: 99.8 },
]

export default function Validators() {
  const greenCount = validators.filter(v => v.trust === "GREEN").length
  const yellowCount = validators.filter(v => v.trust === "YELLOW").length
  const redCount = validators.filter(v => v.trust === "RED").length

  return (
    <div className="page">
      <h2>Validators</h2>

      <p className="muted">
        ⚠ Demo trust index (on-chain version planned)
      </p>

      {/* ================= NETWORK HEALTH ================= */}
      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{validators.length}</span>
            <span className="stat-label">Active Validators</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">99.7%</span>
            <span className="stat-label">Avg Network Uptime</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">Healthy</span>
            <span className="stat-label">Network Status</span>
          </div>
        </div>
      </section>

      {/* ================= UPTIME GRAPH ================= */}
      <section className="section">
        <h3>Network Uptime (7 Days)</h3>

        <div className="graph-card">
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={uptimeData}>
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ================= TRUST DISTRIBUTION ================= */}
      <section className="section">
        <h3>Validator Trust Distribution</h3>

        <div className="trust-summary">
          <span className="trust green">GREEN: {greenCount}</span>
          <span className="trust yellow">YELLOW: {yellowCount}</span>
          <span className="trust red">RED: {redCount}</span>
        </div>
      </section>

      {/* ================= VALIDATOR LIST ================= */}
      <section className="section">
        <h3>Validator List</h3>

        <div className="validator-grid">
          {validators.map((v) => (
            <div key={v.name} className="validator-card">
              <div>
                <h3>{v.name}</h3>
                <p className="muted">Uptime: {v.uptime}%</p>
              </div>

              <div className={`trust ${v.trust.toLowerCase()}`}>
                {v.trust}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
