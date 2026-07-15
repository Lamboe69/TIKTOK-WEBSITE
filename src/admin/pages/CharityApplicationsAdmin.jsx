import { useEffect, useMemo, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getAdminToken } from '../../cms/ContentContext'
import { apiFetch, readJsonResponse } from '../../utils/api'
import { AdminPage } from '../AdminLayout'

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'approved', label: 'Approved' },
  { key: 'declined', label: 'Declined' },
]

function formatWhen(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function ConfirmModal({ open, title, body, confirmLabel, danger, busy, onCancel, onConfirm }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, busy, onCancel])

  if (!open) return null

  return (
    <div className="ba-confirm" role="dialog" aria-modal="true" aria-labelledby="ca-confirm-title">
      <button
        type="button"
        className="ba-confirm__backdrop"
        aria-label="Cancel"
        disabled={busy}
        onClick={onCancel}
      />
      <div className="ba-confirm__panel">
        <h3 id="ca-confirm-title">{title}</h3>
        <p>{body}</p>
        <div className="ba-confirm__actions">
          <button type="button" className="admin-btn admin-btn--ghost" disabled={busy} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={`admin-btn ${danger ? 'admin-btn--danger' : ''}`}
            disabled={busy}
            onClick={onConfirm}
          >
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CharityApplicationsAdmin() {
  const [status, setStatus] = useState('all')
  const [supportType, setSupportType] = useState('all')
  const [rows, setRows] = useState([])
  const [counts, setCounts] = useState({})
  const [supportCounts, setSupportCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [confirmBusy, setConfirmBusy] = useState(false)

  const load = async (nextStatus = status, nextSupport = supportType) => {
    setLoading(true)
    setError('')
    try {
      const token = getAdminToken()
      const qs = new URLSearchParams()
      if (nextStatus && nextStatus !== 'all') qs.set('status', nextStatus)
      if (nextSupport && nextSupport !== 'all') qs.set('supportType', nextSupport)
      const suffix = qs.toString() ? `?${qs}` : ''
      const res = await apiFetch(`/api/admin/charity-applications${suffix}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Failed to load applications')
      setRows(data.applications || [])
      setCounts(data.counts || {})
      setSupportCounts(data.supportCounts || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(status, supportType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, supportType])

  const supportFilters = useMemo(() => {
    const keys = Object.keys(supportCounts).sort((a, b) => a.localeCompare(b))
    return [{ key: 'all', label: 'All types' }, ...keys.map((k) => ({ key: k, label: k }))]
  }, [supportCounts])

  const updateApplication = async (id, patch) => {
    const token = getAdminToken()
    const res = await apiFetch(`/api/admin/charity-applications/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
    })
    const data = await readJsonResponse(res)
    if (!res.ok) throw new Error(data.error || 'Update failed')
    await load(status, supportType)
    if (expanded === id) setNoteDraft(data.application?.notes || '')
    return data
  }

  const askConfirm = (action) => setConfirm(action)

  const runConfirmed = async () => {
    if (!confirm) return
    setConfirmBusy(true)
    try {
      await updateApplication(confirm.id, confirm.patch)
      setToast(confirm.successToast || 'Updated')
      setConfirm(null)
    } catch (err) {
      setToast(err.message)
    } finally {
      setConfirmBusy(false)
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + Number(b || 0), 0)

  return (
    <AdminPage
      title="Charity applications"
      lede="Applications from the Charity page. Review stories and update status."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => load(status, supportType)}>
            Refresh
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
    >
      <div className="ba-apps">
        <div className="ba-apps__stats">
          <span>
            <strong>{total}</strong> total
          </span>
          <span>
            <strong>{counts.new || 0}</strong> new
          </span>
          <span>
            <strong>{counts.contacted || 0}</strong> contacted
          </span>
          <span>
            <strong>{counts.approved || 0}</strong> approved
          </span>
        </div>

        <div className="ba-apps__filters">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`ba-chip ${status === f.key ? 'is-on' : ''}`}
              onClick={() => setStatus(f.key)}
            >
              {f.label}
              {f.key !== 'all' && counts[f.key] != null ? ` ${counts[f.key]}` : ''}
            </button>
          ))}
        </div>

        {supportFilters.length > 2 ? (
          <div className="ba-apps__filters">
            {supportFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`ba-chip ba-chip--battle ${supportType === f.key ? 'is-on' : ''}`}
                onClick={() => setSupportType(f.key)}
              >
                {f.label}
                {f.key !== 'all' && supportCounts[f.key] != null ? ` (${supportCounts[f.key]})` : ''}
              </button>
            ))}
          </div>
        ) : null}

        {loading ? <p className="lede">Loading…</p> : null}
        {error ? (
          <p className="lede" style={{ color: '#ff8a8a' }}>
            {error}
          </p>
        ) : null}
        {!loading && !error && rows.length === 0 ? (
          <p className="lede">No charity applications yet.</p>
        ) : null}

        {!loading && rows.length > 0 ? (
          <div className="ba-table-wrap">
            <table className="ba-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Support</th>
                  <th>Country</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const open = expanded === row.id
                  const who = row.fullName || row.email
                  return (
                    <Fragment key={row.id}>
                      <tr
                        className={open ? 'is-open' : ''}
                        onClick={() => {
                          setExpanded(open ? null : row.id)
                          setNoteDraft(row.notes || '')
                        }}
                      >
                        <td>
                          <strong>{row.fullName}</strong>
                          <small>{row.email}</small>
                        </td>
                        <td>{row.supportType}</td>
                        <td>{row.country}</td>
                        <td>{formatWhen(row.createdAt)}</td>
                        <td>
                          <span className={`ba-status ba-status--${row.status}`}>{row.status}</span>
                        </td>
                        <td className="ba-table__actions" onClick={(e) => e.stopPropagation()}>
                          {row.status === 'new' ? (
                            <button
                              type="button"
                              className="ba-link"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'contacted' },
                                  title: 'Mark as contacted?',
                                  body: `Mark ${who} as contacted?`,
                                  confirmLabel: 'Mark contacted',
                                  successToast: 'Marked contacted',
                                })
                              }
                            >
                              Contact
                            </button>
                          ) : null}
                          {row.status !== 'approved' ? (
                            <button
                              type="button"
                              className="ba-link"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'approved' },
                                  title: 'Approve application?',
                                  body: `Approve charity support for ${who}?`,
                                  confirmLabel: 'Approve',
                                  successToast: 'Approved',
                                })
                              }
                            >
                              Approve
                            </button>
                          ) : null}
                          {row.status !== 'declined' ? (
                            <button
                              type="button"
                              className="ba-link ba-link--dim"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'declined' },
                                  title: 'Decline application?',
                                  body: `Decline ${who}'s charity application?`,
                                  confirmLabel: 'Decline',
                                  danger: true,
                                  successToast: 'Declined',
                                })
                              }
                            >
                              Decline
                            </button>
                          ) : null}
                        </td>
                      </tr>
                      {open ? (
                        <tr className="ba-detail">
                          <td colSpan={6}>
                            <div className="ba-detail__row">
                              <a href={`mailto:${row.email}`}>{row.email}</a>
                              <span>{row.phone}</span>
                              <span>{row.country}</span>
                            </div>
                            <p className="cm-message">{row.story}</p>
                            <div className="ba-detail__notes">
                              <input
                                value={noteDraft}
                                onChange={(e) => setNoteDraft(e.target.value)}
                                placeholder="Admin notes…"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <button
                                type="button"
                                className="admin-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  askConfirm({
                                    id: row.id,
                                    patch: { notes: noteDraft },
                                    title: 'Save notes?',
                                    body: `Save admin notes for ${who}?`,
                                    confirmLabel: 'Save notes',
                                    successToast: 'Notes saved',
                                  })
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <ConfirmModal
        open={Boolean(confirm)}
        title={confirm?.title || ''}
        body={confirm?.body || ''}
        confirmLabel={confirm?.confirmLabel || 'Confirm'}
        danger={Boolean(confirm?.danger)}
        busy={confirmBusy}
        onCancel={() => {
          if (!confirmBusy) setConfirm(null)
        }}
        onConfirm={runConfirmed}
      />

      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
