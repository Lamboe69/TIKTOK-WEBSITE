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

const TYPE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'official', label: 'Official' },
  { key: 'special', label: 'Special' },
]

function formatDay(value) {
  if (!value) return '—'
  const raw = String(value).slice(0, 10)
  const d = new Date(`${raw}T12:00:00`)
  if (Number.isNaN(d.getTime())) return raw
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function formatFollowers(n) {
  if (n == null || n === '') return '—'
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(num >= 10_000 ? 0 : 1)}K`
  return String(num)
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
    <div className="ba-confirm" role="dialog" aria-modal="true" aria-labelledby="ba-confirm-title">
      <button
        type="button"
        className="ba-confirm__backdrop"
        aria-label="Cancel"
        disabled={busy}
        onClick={onCancel}
      />
      <div className="ba-confirm__panel">
        <h3 id="ba-confirm-title">{title}</h3>
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

export default function BattleApplicationsAdmin() {
  const [status, setStatus] = useState('all')
  const [entryType, setEntryType] = useState('all')
  const [battleFilter, setBattleFilter] = useState('all')
  const [collapsed, setCollapsed] = useState({})
  const [rows, setRows] = useState([])
  const [counts, setCounts] = useState({})
  const [typeCounts, setTypeCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [confirmBusy, setConfirmBusy] = useState(false)

  const load = async (nextStatus = status, nextType = entryType) => {
    setLoading(true)
    setError('')
    try {
      const token = getAdminToken()
      const qs = new URLSearchParams()
      if (nextStatus && nextStatus !== 'all') qs.set('status', nextStatus)
      if (nextType && nextType !== 'all') qs.set('type', nextType)
      const suffix = qs.toString() ? `?${qs}` : ''
      const res = await apiFetch(`/api/admin/battle-applications${suffix}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Failed to load applications')
      setRows(data.applications || [])
      setCounts(data.counts || {})
      setTypeCounts(data.typeCounts || {})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(status, entryType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, entryType])

  const battleCounts = useMemo(() => {
    const map = {}
    for (const row of rows) {
      const key = row.battleLabel || 'Unknown battle'
      map[key] = (map[key] || 0) + 1
    }
    return map
  }, [rows])

  const battleFilters = useMemo(() => {
    const labels = Object.keys(battleCounts).sort((a, b) => a.localeCompare(b))
    return [{ key: 'all', label: 'All battles' }, ...labels.map((k) => ({ key: k, label: k }))]
  }, [battleCounts])

  const groups = useMemo(() => {
    const filtered =
      battleFilter === 'all'
        ? rows
        : rows.filter((r) => (r.battleLabel || 'Unknown battle') === battleFilter)

    const map = new Map()
    for (const row of filtered) {
      const key = row.battleLabel || 'Unknown battle'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(row)
    }
    return [...map.entries()]
      .map(([label, apps]) => ({
        label,
        apps,
        entryType: apps[0]?.entryType || '',
        newCount: apps.filter((a) => a.status === 'new').length,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [rows, battleFilter])

  const updateApplication = async (id, patch) => {
    const token = getAdminToken()
    const res = await apiFetch(`/api/admin/battle-applications/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
    })
    const data = await readJsonResponse(res)
    if (!res.ok) throw new Error(data.error || 'Update failed')
    await load(status, entryType)
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

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <AdminPage
      title="Box battle applications"
      lede="Grouped by battle type. Tap a row for notes."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => load(status, entryType)}>
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
            <strong>{Object.keys(battleCounts).length}</strong> battles
          </span>
          <span>
            <strong>{typeCounts.official || 0}</strong> official
          </span>
          <span>
            <strong>{typeCounts.special || 0}</strong> special
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
          <span className="ba-apps__sep" />
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`ba-chip ${entryType === f.key ? 'is-on' : ''}`}
              onClick={() => {
                setEntryType(f.key)
                setBattleFilter('all')
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {battleFilters.length > 2 ? (
          <div className="ba-apps__filters">
            {battleFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`ba-chip ba-chip--battle ${battleFilter === f.key ? 'is-on' : ''}`}
                onClick={() => setBattleFilter(f.key)}
              >
                {f.label}
                {f.key !== 'all' && battleCounts[f.key] != null ? ` (${battleCounts[f.key]})` : ''}
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
        {!loading && !error && groups.length === 0 ? (
          <p className="lede">No applications yet.</p>
        ) : null}

        {groups.map((group) => {
          const isCollapsed = Boolean(collapsed[group.label])
          return (
            <section key={group.label} className="ba-group">
              <button
                type="button"
                className="ba-group__head"
                onClick={() =>
                  setCollapsed((prev) => ({ ...prev, [group.label]: !prev[group.label] }))
                }
              >
                <span className="ba-group__title">{group.label}</span>
                <span className="ba-group__meta">
                  {group.apps.length}
                  {group.newCount ? ` · ${group.newCount} new` : ''}
                  {group.entryType ? ` · ${group.entryType}` : ''}
                  <em>{isCollapsed ? '+' : '−'}</em>
                </span>
              </button>

              {!isCollapsed ? (
                <div className="ba-table-wrap">
                  <table className="ba-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>TikTok</th>
                        <th>Followers</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {group.apps.map((row) => {
                        const open = expanded === row.id
                        const who = row.fullName || `@${row.tiktokHandle}`
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
                                <strong>{row.fullName || '—'}</strong>
                                <small>#{row.id}</small>
                              </td>
                              <td>@{row.tiktokHandle}</td>
                              <td>{formatFollowers(row.followers)}</td>
                              <td>{formatDay(row.availableDate)}</td>
                              <td>
                                <span className={`ba-status ba-status--${row.status}`}>
                                  {row.status}
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
                                        patch: { status: 'contacted' },
                                        title: 'Mark as contacted?',
                                        body: `Mark ${who} as contacted for ${row.battleLabel}?`,
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
                                        title: 'Approve applicant?',
                                        body: `Approve ${who} for ${row.battleLabel}?`,
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
                                        title: 'Decline applicant?',
                                        body: `Decline ${who} for ${row.battleLabel}? This can be changed later.`,
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
                                    <a
                                      href={`https://www.tiktok.com/@${row.tiktokHandle}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Open @{row.tiktokHandle}
                                    </a>
                                    <span>{formatFollowers(row.followers)} followers</span>
                                    <span>Available {formatDay(row.availableDate)}</span>
                                  </div>
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
            </section>
          )
        })}
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
