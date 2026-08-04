import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  useContent,
} from '../../cms/ContentContext'
import {
  defaultOfficialBattleLabel,
  normalizeBattleCatalog,
  scheduleFieldsFromCatalogBattle,
} from '../../cms/battleCatalog'
import { schedule as fallbackSchedule, withSportsCategory } from '../../data/schedule'
import { getBattleImage, getNextSevenDays } from '../../utils/scheduleDisplay'
import { mediaUrl } from '../../utils/mediaUrl'
import { AdminPage } from '../AdminLayout'
import { BattleTitleField } from '../components/BattleTitleField'
import { Field } from './CollectionEditor'

const BATTLE_TYPES = [
  'Daily Godsent',
  'Scavengers',
  'Most Beautiful',
  'Country',
  'Sports',
  'Champion of Champions',
]

function emptyDraft(date, catalog, battleTypes) {
  const battles = normalizeBattleCatalog(catalog)
  const first = battles[0]
  const defaults = first
    ? scheduleFieldsFromCatalogBattle(first, battleTypes)
    : { title: defaultOfficialBattleLabel(catalog), type: 'Daily Godsent', description: '', image: '' }

  return {
    id: null,
    title: defaults.title,
    type: defaults.type,
    date,
    time: '8:00 PM CT',
    image: defaults.image || '',
    description: defaults.description || '',
  }
}

function DayEditor({ day, battleTypes, catalog, media, onSaved, onDeleted }) {
  const [draft, setDraft] = useState(() =>
    day.primary ? { ...day.primary } : emptyDraft(day.date, catalog, battleTypes),
  )
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')
  const isNew = !day.primary
  const dayLabel = day.isToday ? 'Today' : day.isTomorrow ? 'Tomorrow' : day.label.weekdayLong
  const preview = getBattleImage(draft)

  useEffect(() => {
    setDraft(day.primary ? { ...day.primary } : emptyDraft(day.date, catalog, battleTypes))
  }, [day.date, day.primary?.id, catalog, battleTypes])

  const setField = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }))
  }

  const applyBattle = (fields) => {
    setDraft((d) => ({ ...d, ...fields }))
  }

  const save = async () => {
    setBusy(true)
    setToast('')
    try {
      const payload = { ...draft, date: day.date }
      if (isNew) {
        await createCollectionItem('schedule', { ...payload, id: Date.now() })
        setToast('Created')
      } else {
        await updateCollectionItem('schedule', draft.id, payload)
        setToast('Saved')
      }
      await onSaved()
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!draft.id) return
    if (!window.confirm(`Remove the battle for ${dayLabel}?`)) return
    setBusy(true)
    setToast('')
    try {
      await deleteCollectionItem('schedule', draft.id)
      setToast('Removed')
      await onDeleted()
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className={`admin-week__card ${isNew ? 'is-empty' : 'has-battle'}`}>
      <div className="admin-week__card-head">
        <div>
          <p className="admin-week__day-label">{dayLabel}</p>
          <p className="admin-week__day-meta">
            {day.label.weekday} · {day.label.month} {day.label.day}
          </p>
        </div>
        <span className="admin-week__status">{isNew ? 'Empty slot' : 'Scheduled'}</span>
      </div>

      <div className="admin-week__preview">
        {preview ? <img src={mediaUrl(preview)} alt="" /> : <div className="admin-week__preview-empty" />}
      </div>

      <div className="admin-week__fields">
        <BattleTitleField
          value={draft.title}
          onChange={(title) => setField('title', title)}
          catalog={catalog}
          battleTypes={battleTypes}
          onApplyBattle={applyBattle}
        />

        <div className="admin-field">
          <label>Filter type</label>
          <select value={draft.type || ''} onChange={(e) => setField('type', e.target.value)}>
            {battleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-field">
          <label>Time</label>
          <input value={draft.time || ''} onChange={(e) => setField('time', e.target.value)} placeholder="8:00 PM CT" />
        </div>

        <Field
          field={{ key: 'image', label: 'Poster image', type: 'image' }}
          value={draft.image}
          onChange={(v) => setField('image', v)}
          media={media}
        />

        <div className="admin-field">
          <label>Description</label>
          <textarea
            value={draft.description || ''}
            onChange={(e) => setField('description', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {day.battles.length > 1 && (
        <p className="admin-week__more">
          +{day.battles.length - 1} more on this day —{' '}
          <Link to="/admin/collections/schedule">edit all in full list</Link>
        </p>
      )}

      <div className="admin-week__actions">
        <button type="button" className="admin-btn" disabled={busy} onClick={save}>
          {busy ? 'Saving…' : isNew ? 'Add battle' : 'Save day'}
        </button>
        {!isNew && (
          <button type="button" className="admin-btn admin-btn--danger" disabled={busy} onClick={remove}>
            Remove
          </button>
        )}
        {!isNew && (
          <Link to={`/admin/collections/schedule/${draft.id}`} className="admin-btn admin-btn--ghost">
            Full edit
          </Link>
        )}
      </div>

      {toast ? <p className="admin-week__toast">{toast}</p> : null}
    </article>
  )
}

export default function WeekScheduleAdmin() {
  const { content, loading, refresh } = useContent()

  const schedule = content?.collections?.schedule?.length
    ? content.collections.schedule
    : fallbackSchedule

  const catalog = content?.collections?.battleCatalog

  const battleTypes = useMemo(() => {
    const fromCms = (content?.collections?.battleTypes || []).filter((t) => t && t !== 'All')
    return withSportsCategory(fromCms.length ? fromCms : BATTLE_TYPES)
  }, [content?.collections?.battleTypes])

  const days = useMemo(() => getNextSevenDays(schedule), [schedule])
  const media = content?.collections?.mediaLibrary || []
  const filled = days.filter((d) => d.primary).length

  const bump = async () => {
    await refresh()
  }

  if (loading) {
    return (
      <AdminPage title="Next 7 days">
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title="Next 7 days"
      lede="Edit the seven-day horizon boxes on the Battle Schedule page. Pick a battle from your catalog — poster and description fill in automatically."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <a href="/battle-schedule#week-horizon" target="_blank" rel="noreferrer" className="admin-btn admin-btn--ghost">
            Preview on site
          </a>
          <Link to="/admin/collections/battleCatalog" className="admin-btn admin-btn--ghost">
            Manage battles
          </Link>
          <Link to="/admin/collections/schedule" className="admin-btn admin-btn--ghost">
            All battles
          </Link>
          <Link to="/admin/pages/schedule" className="admin-btn admin-btn--ghost">
            Section copy
          </Link>
        </div>
      }
    >
      <div className="admin-week__summary">
        <strong>{filled}</strong> of <strong>7</strong> days filled · dates run from today through the next six days
      </div>

      <div className="admin-week__grid">
        {days.map((day) => (
          <DayEditor
            key={day.date}
            day={day}
            battleTypes={battleTypes}
            catalog={catalog}
            media={media}
            onSaved={bump}
            onDeleted={bump}
          />
        ))}
      </div>
    </AdminPage>
  )
}
