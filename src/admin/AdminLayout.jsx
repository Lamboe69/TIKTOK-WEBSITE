import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getAdminToken, setAdminToken, useContent } from '../cms/ContentContext'
import { COLLECTIONS, PAGE_SCHEMA } from '../cms/schema'
import './admin.css'

function useAuthGate() {
  const [state, setState] = useState({ loading: true, ok: false })

  useEffect(() => {
    const token = getAdminToken()
    if (!token) {
      setState({ loading: false, ok: false })
      return
    }
    fetch('/api/admin/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => setState({ loading: false, ok: r.ok }))
      .catch(() => setState({ loading: false, ok: false }))
  }, [])

  return state
}

export function AdminLogin() {
  const nav = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const auth = useAuthGate()

  if (!auth.loading && auth.ok) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setAdminToken(data.token)
      nav('/admin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-root admin-login">
      <form className="admin-login__card" onSubmit={submit}>
        <p className="admin-login__brand">KM Dynasty</p>
        <p className="admin-login__sub">
          Admin console — manage pages, copy, images, schedule, and more.
        </p>
        <label htmlFor="admin-pass">Password</label>
        <input
          id="admin-pass"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? <p className="admin-login__err">{error}</p> : null}
        <button className="admin-btn" type="submit" disabled={busy} style={{ width: '100%' }}>
          {busy ? 'Signing in…' : 'Enter dashboard'}
        </button>
      </form>
    </div>
  )
}

/** Page chrome: sticky header + scrollable body */
export function AdminPage({ title, lede, actions, children }) {
  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div className="admin-page__heading">
          {title ? <h1>{title}</h1> : null}
          {lede ? <p className="lede">{lede}</p> : null}
        </div>
        {actions ? <div className="admin-page__actions">{actions}</div> : null}
      </header>
      <div className="admin-page__body">{children}</div>
    </div>
  )
}

function AdminShell() {
  const location = useLocation()
  const nav = useNavigate()
  const auth = useAuthGate()
  const { refresh } = useContent()

  useEffect(() => {
    document.documentElement.classList.add('admin-lock')
    document.body.classList.add('admin-lock')
    return () => {
      document.documentElement.classList.remove('admin-lock')
      document.body.classList.remove('admin-lock')
    }
  }, [])

  if (auth.loading) {
    return (
      <div className="admin-root admin-login">
        <p className="lede">Checking session…</p>
      </div>
    )
  }

  if (!auth.ok) return <Navigate to="/admin/login" replace />

  const logout = () => {
    setAdminToken('')
    nav('/admin/login', { replace: true })
  }

  return (
    <div className="admin-root admin-shell">
      <aside className="admin-side">
        <Link to="/admin" className="admin-side__brand">
          KM Admin
        </Link>
        <div className="admin-side__scroll">
          <nav className="admin-side__nav">
            <Link to="/admin" className={location.pathname === '/admin' ? 'is-active' : ''}>
              Dashboard
            </Link>
            <Link
              to="/admin/settings"
              className={location.pathname === '/admin/settings' ? 'is-active' : ''}
            >
              Site settings
            </Link>
            <Link
              to="/admin/media"
              className={location.pathname === '/admin/media' ? 'is-active' : ''}
            >
              Media library
            </Link>

            <p className="admin-side__section">Pages</p>
            {PAGE_SCHEMA.map((p) => (
              <Link
                key={p.key}
                to={`/admin/pages/${p.key}`}
                className={location.pathname === `/admin/pages/${p.key}` ? 'is-active' : ''}
              >
                {p.label}
              </Link>
            ))}

            <p className="admin-side__section">Collections</p>
            {COLLECTIONS.map((c) => (
              <Link
                key={c.key}
                to={`/admin/collections/${c.key}`}
                className={
                  location.pathname.startsWith(`/admin/collections/${c.key}`) ? 'is-active' : ''
                }
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="admin-side__foot">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => refresh()}>
            Reload content
          </button>
          <a className="admin-btn admin-btn--ghost" href="/" target="_blank" rel="noreferrer">
            View site
          </a>
          <button type="button" className="admin-btn admin-btn--danger" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export function AdminLayout() {
  return <AdminShell />
}
