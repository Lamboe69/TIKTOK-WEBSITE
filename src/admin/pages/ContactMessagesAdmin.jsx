import { useEffect, useMemo, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getAdminToken } from '../../cms/ContentContext'
import { AdminPage } from '../AdminLayout'

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'archived', label: 'Archived' },
]

const TOPIC_SHORT = {
  'General Question': 'General',
  "Creator Management Inquiry (La'Gwat Agency)": 'Creator',
  'Press / Media': 'Press',
  Other: 'Other',
}

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

function statusLabel(status) {
  if (status === 'in_progress') return 'in progress'
  return status || '—'
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
    <div className="ba-confirm" role="dialog" aria-modal="true" aria-labelledby="cm-confirm-title">
      <button
        type="button"
        className="ba-confirm__backdrop"
        aria-label="Cancel"
        disabled={busy}
        onClick={onCancel}
      />
      <div className="ba-confirm__panel">
        <h3 id="cm-confirm-title">{title}</h3>
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

export default function ContactMessagesAdmin() {
  const [status, setStatus] = useState('all')
  const [topic, setTopic] = useState('all')
  const [rows, setRows] = useState([])
  const [counts, setCounts] = useState({})
  const [topicCounts, setTopicCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [confirmBusy, setConfirmBusy] = useState(false)

  const load = async (nextStatus = status, nextTopic = topic) => {
    setLoading(true)
    setError('')
    try {
      const token = getAdminToken()
      const qs = new URLSearchParams()
      if (nextStatus && nextStatus !== 'all') qs.set('status', nextStatus)
      if (nextTopic && nextTopic !== 'all') qs.set('topic', nextTopic)
      const suffix = qs.toString() ? `?${qs}` : ''
      const res = await fetch(`/api/admin/contact-messages${suffix}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to load messages')
      setRows(data.messages || [])
      setCounts(data.counts || {})
      setTopicCounts(data.topicCounts || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(status, topic)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, topic])

  const topicFilters = useMemo(() => {
    const labels = Object.keys(topicCounts).sort((a, b) => a.localeCompare(b))
    return [
      { key: 'all', label: 'All topics' },
      ...labels.map((k) => ({ key: k, label: TOPIC_SHORT[k] || k })),
    ]
  }, [topicCounts])

  const updateMessage = async (id, patch) => {
    const token = getAdminToken()
    const res = await fetch(`/api/admin/contact-messages/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Update failed')
    await load(status, topic)
    if (expanded === id) setNoteDraft(data.message?.notes || '')
    return data
  }

  const askConfirm = (action) => setConfirm(action)

  const runConfirmed = async () => {
    if (!confirm) return
    setConfirmBusy(true)
    try {
      await updateMessage(confirm.id, confirm.patch)
      setToast(confirm.successToast || 'Updated')
      setConfirm(null)
    } catch (err) {
      setToast(err.message)
    } finally {
      setConfirmBusy(false)
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + Number(b || 0), 0)
  const openCount = (counts.new || 0) + (counts.in_progress || 0)

  return (
    <AdminPage
      title="Contact messages"
      lede="Messages from the Contact page. Review concerns and mark them resolved."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => load(status, topic)}>
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
            <strong>{openCount}</strong> open
          </span>
          <span>
            <strong>{counts.resolved || 0}</strong> resolved
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

        {topicFilters.length > 2 ? (
          <div className="ba-apps__filters">
            {topicFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`ba-chip ba-chip--battle ${topic === f.key ? 'is-on' : ''}`}
                onClick={() => setTopic(f.key)}
              >
                {f.label}
                {f.key !== 'all' && topicCounts[f.key] != null ? ` (${topicCounts[f.key]})` : ''}
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
          <p className="lede">No contact messages yet.</p>
        ) : null}

        {!loading && rows.length > 0 ? (
          <div className="ba-table-wrap">
            <table className="ba-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Topic</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const open = expanded === row.id
                  const who = row.name || row.email
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
                          <strong>{row.name}</strong>
                          <small>{row.email}</small>
                        </td>
                        <td>{TOPIC_SHORT[row.topic] || row.topic}</td>
                        <td>{formatWhen(row.createdAt)}</td>
                        <td>
                          <span className={`ba-status ba-status--${row.status}`}>
                            {statusLabel(row.status)}
                          </span>
                        </td>
                        <td className="ba-table__actions" onClick={(e) => e.stopPropagation()}>
                          {row.status === 'new' ? (
                            <button
                              type="button"
                              className="ba-link"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'in_progress' },
                                  title: 'Start working on this?',
                                  body: `Mark ${who}'s message as in progress?`,
                                  confirmLabel: 'In progress',
                                  successToast: 'Marked in progress',
                                })
                              }
                            >
                              Start
                            </button>
                          ) : null}
                          {row.status !== 'resolved' ? (
                            <button
                              type="button"
                              className="ba-link"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'resolved' },
                                  title: 'Resolve this concern?',
                                  body: `Mark ${who}'s message as resolved?`,
                                  confirmLabel: 'Resolve',
                                  successToast: 'Resolved',
                                })
                              }
                            >
                              Resolve
                            </button>
                          ) : null}
                          {row.status !== 'archived' ? (
                            <button
                              type="button"
                              className="ba-link ba-link--dim"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'archived' },
                                  title: 'Archive message?',
                                  body: `Archive ${who}'s message? You can still find it under Archived.`,
                                  confirmLabel: 'Archive',
                                  danger: true,
                                  successToast: 'Archived',
                                })
                              }
                            >
                              Archive
                            </button>
                          ) : null}
                          {row.status === 'archived' || row.status === 'resolved' ? (
                            <button
                              type="button"
                              className="ba-link ba-link--dim"
                              onClick={() =>
                                askConfirm({
                                  id: row.id,
                                  patch: { status: 'new' },
                                  title: 'Reopen message?',
                                  body: `Move ${who}'s message back to New?`,
                                  confirmLabel: 'Reopen',
                                  successToast: 'Reopened',
                                })
                              }
                            >
                              Reopen
                            </button>
                          ) : null}
                        </td>
                      </tr>
                      {open ? (
                        <tr className="ba-detail">
                          <td colSpan={5}>
                            <div className="ba-detail__row">
                              <a href={`mailto:${row.email}`}>{row.email}</a>
                              <span>{row.topic}</span>
                              {row.resolvedAt ? (
                                <span>Resolved {formatWhen(row.resolvedAt)}</span>
                              ) : null}
                            </div>
                            <p className="cm-message">{row.message}</p>
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
