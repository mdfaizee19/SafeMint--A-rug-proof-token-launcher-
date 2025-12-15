const proposals = [
  {
    id: 1,
    title: "Increase Minimum LP Lock to 12 Months",
    yes: 72,
    no: 28,
    status: "ACTIVE",
    quorum: "60%",
    endsIn: "2 days",
  },
  {
    id: 2,
    title: "Enable Community Token Listings",
    yes: 88,
    no: 12,
    status: "PASSED",
    quorum: "60%",
    endsIn: "Ended",
  },
]

export default function Governance() {
  const activeCount = proposals.filter(p => p.status === "ACTIVE").length
  const passedCount = proposals.filter(p => p.status === "PASSED").length

  return (
    <div className="page">
      <h2>🏛 Governance</h2>

      <p className="muted">
        Community-driven protocol decisions
      </p>

      {/* ================= GOVERNANCE SUMMARY ================= */}
      <section className="section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{activeCount}</span>
            <span className="stat-label">Active Proposals</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">{passedCount}</span>
            <span className="stat-label">Passed Proposals</span>
          </div>

          <div className="stat-card">
            <span className="stat-value">78%</span>
            <span className="stat-label">Avg Participation</span>
          </div>
        </div>
      </section>

      {/* ================= PROPOSALS ================= */}
      <section className="section">
        <h3>Proposals</h3>

        <div className="proposal-grid">
          {proposals.map((p) => (
            <div key={p.id} className="proposal-card">
              <h3>{p.title}</h3>

              {/* Voting progress */}
              <div className="vote-bar">
                <div
                  className="vote yes"
                  style={{ width: `${p.yes}%` }}
                />
                <div
                  className="vote no"
                  style={{ width: `${p.no}%` }}
                />
              </div>

              {/* Proposal meta */}
              <div className="proposal-meta">
                <span>Quorum: {p.quorum}</span>
                <span>
                  {p.status === "ACTIVE"
                    ? `Ends in: ${p.endsIn}`
                    : "Voting closed"}
                </span>
              </div>

              {/* Footer */}
              <div className="proposal-footer">
                <span className="vote-text">
                  YES: {p.yes}% &nbsp;|&nbsp; NO: {p.no}%
                </span>

                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
