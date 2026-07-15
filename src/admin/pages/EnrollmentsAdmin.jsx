import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAdminToken } from '../../cms/ContentContext'
import { AdminPage } from '../AdminLayout'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'paid', label: 'Paid' },
  { key: 'pending', label: 'Pending' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'failed', label: 'Failed' },
  { key: 'refunded', label: 'Refunded' },
]

function money(cents, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format((cents || 0) / 100)
  } catch {
    return `$${((cents || 0) / 100).toFixed(2)}`
  }
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

export default function EnrollmentsAdmin() {
  const [status, setStatus] = useState('all')
  const [rows, setRows] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')

  const load = async (nextStatus = status) => {
    setLoading(true)
    setError('')
    try {
      const token = getAdminToken()
      const qs = nextStatus && nextStatus !== 'all' ? `?status=${encodeURIComponent(nextStatus)}` : ''
      const res = await fetch(`/api/admin/enrollments${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to load enrollments')
      setRows(data.enrollments || [])
      setCounts(data.counts || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const updateEnrollment = async (id, patch) => {
    try {
      const token = getAdminToken()
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patch),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Update failed')
      setToast('Enrollment updated')
      await load(status)
      if (expanded === id) {
        setNoteDraft(data.enrollment?.notes || '')
      }
    } catch (err) {
      setToast(err.message)
    }
  }

  const totalPaid = counts.paid || 0
  const totalPending = counts.pending || 0

  return (
    <AdminPage
      title="Masterclass enrollments"
      lede="Payments and bookings from the masterclass checkout. Paid records include PayPal capture IDs for reconciliation."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => load(status)}>
            Refresh
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
    >
      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{Object.values(counts).reduce((a, b) => a + b, 0)}</strong>
          <span>Total</span>
        </div>
        <div className="admin-stat">
          <strong>{totalPaid}</strong>
          <span>Paid</span>
        </div>
        <div className="admin-stat">
          <strong>{totalPending}</strong>
          <span>Pending</span>
        </div>
      </div>

      <div className="admin-toolbar" style={{ flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`admin-btn ${status === f.key ? '' : 'admin-btn--ghost'}`}
            onClick={() => setStatus(f.key)}
          >
            {f.label}
            {counts[f.key] != null ? ` (${counts[f.key]})` : ''}
          </button>
        ))}
      </div>

      {loading ? <p className="lede">Loading enrollments…</p> : null}
      {error ? <p className="lede" style={{ color: '#ff8a8a' }}>{error}</p> : null}

      {!loading && !error && rows.length === 0 ? (
        <p className="lede">No enrollments yet. When someone pays via PayPal on /masterclass, they appear here.</p>
      ) : null}

      <div className="admin-list">
        {rows.map((row) => {
          const open = expanded === row.id
          return (
            <div key={row.id} className="admin-card" style={{ marginBottom: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem 1.25rem',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <strong style={{ display: 'block', marginBottom: 4 }}>
                    #{row.id} · {row.buyerName}
                  </strong>
                  <span style={{ color: 'var(--ad-muted)', fontSize: '0.85rem' }}>
                    {row.buyerEmail}
                    {row.buyerPhone ? ` · ${row.buyerPhone}` : ''}
                  </span>
                  <div style={{ marginTop: 6, fontSize: '0.9rem' }}>
                    {row.tierName} · {money(row.amountCents, row.currency)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.55rem',
                      border: '1px solid var(--ad-line)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color:
                        row.status === 'paid'
                          ? '#8dffb0'
                          : row.status === 'failed'
                            ? '#ff8a8a'
                            : 'var(--ad-muted)',
                    }}
                  >
                    {row.status}
                  </span>
                  <div style={{ marginTop: 6, fontSize: '0.75rem', color: 'var(--ad-muted)' }}>
                    {formatDate(row.paidAt || row.createdAt)}
                  </div>
                </div>
              </div>

              <div className="admin-toolbar" style={{ marginTop: '0.85rem', marginBottom: 0 }}>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => {
                    setExpanded(open ? null : row.id)
                    setNoteDraft(row.notes || '')
                  }}
                >
                  {open ? 'Hide details' : 'Details'}
                </button>
                {row.status === 'paid' ? (
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => updateEnrollment(row.id, { status: 'contacted' })}
                  >
                    Mark contacted
                  </button>
                ) : null}
              </div>

              {open ? (
                <div style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--ad-muted)' }}>
                  <p style={{ margin: '0 0 0.4rem' }}>
                    PayPal order: {row.paypalOrderId || '—'}
                  </p>
                  <p style={{ margin: '0 0 0.4rem' }}>
                    Capture: {row.paypalCaptureId || '—'}
                  </p>
                  <p style={{ margin: '0 0 0.75rem' }}>Created: {formatDate(row.createdAt)}</p>
                  <div className="admin-field">
                    <label>Admin notes</label>
                    <textarea
                      value={noteDraft}
                      onChange={(e) => setNoteDraft(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <button
                    type="button"
                    className="admin-btn"
                    onClick={() => updateEnrollment(row.id, { notes: noteDraft })}
                  >
                    Save notes
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
