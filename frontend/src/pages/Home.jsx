import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllTokens } from "../services/tokenService"
import NavBar from "../components/NavBar"

export default function Home() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    setTokens(getAllTokens())
  }, [])

  return (
    <>
      <NavBar />

      <div className="page">
        {/* ===================== STATS ===================== */}
        <section className="section">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{tokens.length}</span>
              <span className="stat-label">Total Launches</span>
            </div>

            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">Liquidity Locked</span>
            </div>

            <div className="stat-card">
              <span className="stat-value">0</span>
              <span className="stat-label">Rug Incidents</span>
            </div>
          </div>
        </section>

        {/* ===================== LAUNCHES ===================== */}
        <section className="section">
          <div className="section-head">
            <h2>Live Launches</h2>
            <span className="muted">Verified & fair-launch tokens</span>
          </div>

          <div className="token-grid">
            {tokens.map((t) => (
              <Link
                key={t.address}
                to={`/token/${t.address}`}
                className="token-link"
              >
                <div className="token-card">
                  <h3>
                    {t.name} <span>({t.symbol})</span>
                  </h3>

                  <p className="liquidity">
                    Liquidity: {t.liquidity} ETH
                  </p>

                  <span className={`trust ${t.trust.toLowerCase()}`}>
                    {t.trust}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================== VALIDATORS ===================== */}
        <section className="section">
          <div className="section-head">
            <h2>Validators</h2>
            <span className="muted">Network security layer</span>
          </div>

          <div className="preview-grid">
            <div className="preview-card">
              <div>
                <strong>Validator 1</strong>
                <p className="muted">Uptime 99.9%</p>
              </div>
              <span className="trust green">Active</span>
            </div>

            <div className="preview-card">
              <div>
                <strong>Validator 2</strong>
                <p className="muted">Uptime 99.7%</p>
              </div>
              <span className="trust green">Active</span>
            </div>
          </div>
        </section>

        {/* ===================== GOVERNANCE ===================== */}
        <section className="section">
          <div className="section-head">
            <h2>Governance</h2>
            <span className="muted">Protocol decisions</span>
          </div>

          <div className="preview-card">
            <div>
              <strong>Proposal #12</strong>
              <p className="muted">LP Lock Enforcement</p>
            </div>
            <span className="trust yellow">Active</span>
          </div>
        </section>
      </div>
    </>
  )
}
