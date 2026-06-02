import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function getApiBaseUrl() {
  const { hostname, protocol } = window.location

  if (hostname.endsWith('.app.github.dev')) {
    return `${protocol}//${hostname.replace('-5173.', '-8000.')}`
  }

  return 'http://localhost:8000'
}

function Overview() {
  const apiBaseUrl = getApiBaseUrl()

  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">Modern multi-tier starter</p>
        <h1>OctoFit Tracker</h1>
        <p className="lead">
          React 19, Vite, Express, TypeScript, Mongoose, and MongoDB are wired
          together with the default local ports already fixed for development.
        </p>
        <div className="cta-row">
          <a className="btn btn-warning btn-lg" href={`${apiBaseUrl}/api/health`}>
            Check API health
          </a>
          <span className="endpoint-label">{apiBaseUrl}/api/health</span>
        </div>
      </div>

      <div className="stack-grid" aria-label="Application tiers">
        <article className="stack-card accent-ember">
          <span className="stack-label">Presentation tier</span>
          <strong>React 19 + Vite</strong>
          <p>Frontend development server pinned to port 5173.</p>
        </article>
        <article className="stack-card accent-ocean">
          <span className="stack-label">Logic tier</span>
          <strong>Express + TypeScript</strong>
          <p>Backend API listens on port 8000 under /api.</p>
        </article>
        <article className="stack-card accent-forest">
          <span className="stack-label">Data tier</span>
          <strong>MongoDB + Mongoose</strong>
          <p>Default connection targets octofit_db on port 27017.</p>
        </article>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <img src={logo} className="brand-logo" alt="OctoFit Tracker logo" />
          <div>
            <p className="brand-kicker">OctoFit</p>
            <span className="brand-subtitle">Activity tracking platform scaffold</span>
          </div>
        </div>

        <nav className="topnav" aria-label="Primary navigation">
          <NavLink to="/">Overview</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Overview />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
