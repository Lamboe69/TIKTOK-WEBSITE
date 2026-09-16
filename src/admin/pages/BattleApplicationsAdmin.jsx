import { useEffect, useMemo, useState, useRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { getAdminToken } from '../../cms/ContentContext'
import { apiFetch, readJsonResponse } from '../../utils/api'
import { mediaUrl } from '../../utils/mediaUrl'
import { AdminPage } from '../AdminLayout'
import { AdminPagination, AdminSearchBar } from '../components/AdminListControls'
import { ADMIN_PAGE_SIZE, paginateItems } from '../utils/collectionList'
import { formatCount, normalizeCountAbbrev } from '../../utils/formatCount'

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

function formatFollowers(n) {
  if (n == null || n === '') return '—'
  const num = Number(n)
  if (!Number.isFinite(num)) return normalizeCountAbbrev(n)
  return normalizeCountAbbrev(formatCount(num) || String(num))
}

function formatRally(value) {
  if (!value) return '—'
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function ScreenshotLink({ url, label }) {
  if (!url) return <span>{label}: —</span>
  const href = mediaUrl(url)
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  )
}

function ConfirmModal({ open, title, body, confirmLabel, danger, busy, onCancel, onConfirm, meta }) {
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
      <div className={`ba-confirm__panel${danger ? ' ba-confirm__panel--danger' : ''}`}>
        {danger ? (
          <div className="ba-confirm__icon" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : null}
        <h3 id="ba-confirm-title">{title}</h3>
        <p>{body}</p>
        {meta ? (
          <ul className="ba-confirm__meta">
            {meta.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
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

function BattleGroupSection({
  group,
  isCollapsed,
  onToggleCollapse,
  resetKey,
  expanded,
  setExpanded,
  noteDraft,
  setNoteDraft,
  askConfirm,
}) {
  const [page, setPage] = useState(1)
  const pagination = useMemo(
    () => paginateItems(group.apps, page, ADMIN_PAGE_SIZE),
    [group.apps, page],
  )

  useEffect(() => {
    setPage(1)
  }, [resetKey, group.label])

  return (
    <section className="ba-group">
      <button type="button" className="ba-group__head" onClick={onToggleCollapse}>
        <span className="ba-group__title">{group.label}</span>
        <span className="ba-group__meta">
          {group.apps.length} applicants
          {group.newCount ? ` · ${group.newCount} new` : ''}
          {group.entryType ? ` · ${group.entryType}` : ''}
          {pagination.totalPages > 1 ? ` · page ${pagination.page}/${pagination.totalPages}` : ''}
          <em>{isCollapsed ? '+' : '−'}</em>
        </span>
      </button>

      {!isCollapsed ? (
        <>
          <div className="ba-group__pagination">
            <AdminPagination
              compact
              label="Applicants"
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              start={pagination.start}
              end={pagination.end}
              onChange={setPage}
            />
          </div>

          <div className="ba-table-wrap">
            <table className="ba-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>TikTok</th>
                  <th>Country / Team</th>
                  <th>Followers</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {pagination.items.map((row) => {
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
                        <td>
                          {row.country || row.team
                            ? [row.country, row.team].filter(Boolean).join(' · ')
                            : '—'}
                        </td>
                        <td>{formatFollowers(row.followers)}</td>
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
                          <button
                            type="button"
                            className="ba-link ba-link--danger"
                            onClick={() =>
                              askConfirm({
                                id: row.id,
                                action: 'delete',
                                title: 'Delete this application?',
                                body: 'This removes the application from your list. You can undo right after if you change your mind.',
                                meta: [
                                  who,
                                  `@${row.tiktokHandle}`,
                                  row.battleLabel || 'Unknown battle',
                                  `Status: ${row.status}`,
                                ],
                                confirmLabel: 'Delete application',
                                danger: true,
                                successToast: 'Application deleted',
                              })
                            }
                          >
                            Delete
                          </button>
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
                              <span>{row.email || '—'}</span>
                              <span>{row.whatsapp || '—'}</span>
                              <span>{formatFollowers(row.followers)} followers</span>
                              <span>League {row.leagueLevel || '—'}</span>
                              <span>Badge {row.badgeNumber || '—'}</span>
                              <span>
                                Community / team:{' '}
                                {row.hasCommunity === 'yes'
                                  ? 'Yes'
                                  : row.hasCommunity === 'no'
                                    ? 'No'
                                    : '—'}
                              </span>
                              {row.team ? <span>Team name: {row.team}</span> : null}
                              <span>
                                Highest coins in one battle: {formatFollowers(row.highestCoins)}
                              </span>
                              <span>Rally supporters: {formatRally(row.canRallySupporters)}</span>
                              <ScreenshotLink url={row.followersScreenshotUrl} label="Followers screenshot" />
                              <ScreenshotLink
                                url={row.giftingLevelScreenshotUrl}
                                label="Gifting level screenshot"
                              />
                            </div>
                            {row.followersScreenshotUrl || row.giftingLevelScreenshotUrl ? (
                              <div className="ba-detail__shots">
                                {row.followersScreenshotUrl ? (
                                  <figure>
                                    <figcaption>Followers screenshot</figcaption>
                                    <a
                                      href={mediaUrl(row.followersScreenshotUrl)}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <img
                                        src={mediaUrl(row.followersScreenshotUrl)}
                                        alt={`Followers screenshot for ${who}`}
                                      />
                                    </a>
                                  </figure>
                                ) : null}
                                {row.giftingLevelScreenshotUrl ? (
                                  <figure>
                                    <figcaption>Gifting level screenshot</figcaption>
                                    <a
                                      href={mediaUrl(row.giftingLevelScreenshotUrl)}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <img
                                        src={mediaUrl(row.giftingLevelScreenshotUrl)}
                                        alt={`Gifting level screenshot for ${who}`}
                                      />
                                    </a>
                                  </figure>
                                ) : null}
                              </div>
                            ) : null}
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

          <div className="ba-group__pagination ba-group__pagination--foot">
            <AdminPagination
              compact
              label="Applicants"
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              start={pagination.start}
              end={pagination.end}
              onChange={setPage}
            />
          </div>
        </>
      ) : null}
    </section>
  )
}

export default function BattleApplicationsAdmin() {
  const [status, setStatus] = useState('all')
  const [entryType, setEntryType] = useState('all')
  const [battleFilter, setBattleFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState({})
  const [rows, setRows] = useState([])
  const [counts, setCounts] = useState({})
  const [typeCounts, setTypeCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [confirmBusy, setConfirmBusy] = useState(false)
  const toastTimer = useRef(null)

  const showToast = (next) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(next)
    const ms = next?.undoId ? 12000 : 3200
    toastTimer.current = window.setTimeout(() => setToast(null), ms)
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

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

  const listResetKey = `${query}|${battleFilter}|${status}|${entryType}`

  const searchedRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((row) => {
      const haystack = [
        row.fullName,
        row.tiktokHandle,
        row.battleLabel,
        row.country,
        row.team,
        row.email,
        row.whatsapp,
        row.status,
        row.notes,
        row.leagueLevel,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [rows, query])

  const battleCounts = useMemo(() => {
    const map = {}
    for (const row of searchedRows) {
      const key = row.battleLabel || 'Unknown battle'
      map[key] = (map[key] || 0) + 1
    }
    return map
  }, [searchedRows])

  const battleFilters = useMemo(() => {
    const labels = Object.keys(battleCounts).sort((a, b) => a.localeCompare(b))
    return [{ key: 'all', label: 'All battles' }, ...labels.map((k) => ({ key: k, label: k }))]
  }, [battleCounts])

  const groups = useMemo(() => {
    const filtered =
      battleFilter === 'all'
        ? searchedRows
        : searchedRows.filter((r) => (r.battleLabel || 'Unknown battle') === battleFilter)

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
  }, [searchedRows, battleFilter])

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

  const deleteApplication = async (id) => {
    const token = getAdminToken()
    const res = await apiFetch(`/api/admin/battle-applications/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await readJsonResponse(res)
    if (!res.ok) throw new Error(data.error || 'Delete failed')
    if (expanded === id) {
      setExpanded(null)
      setNoteDraft('')
    }
    await load(status, entryType)
    return data
  }

  const restoreApplication = async (id) => {
    const token = getAdminToken()
    const res = await apiFetch(`/api/admin/battle-applications/${id}/restore`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await readJsonResponse(res)
    if (!res.ok) throw new Error(data.error || 'Restore failed')
    await load(status, entryType)
    return data
  }

  const askConfirm = (action) => setConfirm(action)

  const runConfirmed = async () => {
    if (!confirm) return
    setConfirmBusy(true)
    try {
      if (confirm.action === 'delete') {
        await deleteApplication(confirm.id)
        setConfirm(null)
        showToast({
          message: confirm.successToast || 'Application deleted',
          undoId: confirm.id,
        })
      } else {
        await updateApplication(confirm.id, confirm.patch)
        setConfirm(null)
        showToast({ message: confirm.successToast || 'Updated' })
      }
    } catch (err) {
      showToast({ message: err.message })
    } finally {
      setConfirmBusy(false)
    }
  }

  const undoDelete = async () => {
    if (!toast?.undoId) return
    const id = toast.undoId
    try {
      await restoreApplication(id)
      showToast({ message: 'Application restored' })
    } catch (err) {
      showToast({ message: err.message })
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  return (
    <AdminPage
      wide
      title="Box battle applications"
      lede="Grouped by battle type. Each battle section paginates 5 applicants at a time — expand a section to browse pages."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => load(status, entryType)}>
            Refresh
          </button>
          <Link to="/admin/collections/leagueLevels" className="admin-btn admin-btn--ghost">
            League levels
          </Link>
          <Link to="/admin/settings" className="admin-btn admin-btn--ghost">
            Form settings
          </Link>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
      search={
        <AdminSearchBar
          variant="header"
          value={query}
          onChange={setQuery}
          placeholder="Search name, TikTok, battle, country, team, email…"
        />
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
          <p className="lede">{query ? 'No applications match your search.' : 'No applications yet.'}</p>
        ) : null}

        {groups.map((group) => (
          <BattleGroupSection
            key={group.label}
            group={group}
            isCollapsed={Boolean(collapsed[group.label])}
            onToggleCollapse={() =>
              setCollapsed((prev) => ({ ...prev, [group.label]: !prev[group.label] }))
            }
            resetKey={listResetKey}
            expanded={expanded}
            setExpanded={setExpanded}
            noteDraft={noteDraft}
            setNoteDraft={setNoteDraft}
            askConfirm={askConfirm}
          />
        ))}
      </div>

      <ConfirmModal
        open={Boolean(confirm)}
        title={confirm?.title || ''}
        body={confirm?.body || ''}
        meta={confirm?.meta || null}
        confirmLabel={confirm?.confirmLabel || 'Confirm'}
        danger={Boolean(confirm?.danger)}
        busy={confirmBusy}
        onCancel={() => {
          if (!confirmBusy) setConfirm(null)
        }}
        onConfirm={runConfirmed}
      />

      {toast ? (
        <div className={`admin-toast${toast.undoId ? ' admin-toast--undo' : ''}`}>
          <span>{toast.message}</span>
          {toast.undoId ? (
            <button type="button" className="admin-toast__undo" onClick={undoDelete}>
              Undo
            </button>
          ) : null}
        </div>
      ) : null}
    </AdminPage>
  )
}
