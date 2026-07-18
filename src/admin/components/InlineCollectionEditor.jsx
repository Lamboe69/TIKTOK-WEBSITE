import { useEffect, useState } from 'react'
import {
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  uploadImage,
  useContent,
} from '../../cms/ContentContext'
import { blankItem, getCollection } from '../../cms/schema'
import { mediaLabel, mediaUrl } from '../../utils/mediaUrl'

function CollectionField({ field, value, onChange, media }) {
  if (field.type === 'textarea') {
    return (
      <div className="admin-field">
        <label>{field.label}</label>
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} />
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div className="admin-field">
        <label>{field.label}</label>
        <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    )
  }

  if (field.type === 'image') {
    return (
      <div className="admin-field">
        <label>{field.label}</label>
        <div className="admin-image-row">
          {value ? <img src={mediaUrl(value)} alt="" /> : <div />}
          <div>
            <input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/photos/example.jpg or https://…"
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <label className="admin-btn admin-btn--ghost" style={{ cursor: 'pointer' }}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const { path } = await uploadImage(file)
                    onChange(path)
                  }}
                />
              </label>
              {media?.length ? (
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) onChange(e.target.value)
                  }}
                >
                  <option value="">Pick from library…</option>
                  {media.map((m) => (
                    <option key={m} value={m}>
                      {mediaLabel(m)}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-field">
      <label>{field.label}</label>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default function InlineCollectionEditor({
  collectionKey,
  title = 'Items',
  hint,
  emptyHint = 'No items yet — add one below.',
}) {
  const schema = getCollection(collectionKey)
  const { content, refresh } = useContent()
  const items = Array.isArray(content?.collections?.[collectionKey])
    ? content.collections[collectionKey]
    : []
  const media = content?.collections?.mediaLibrary || []

  const [drafts, setDrafts] = useState({})
  const [busyId, setBusyId] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const next = {}
    for (const item of items) {
      next[item.id] = { ...item }
    }
    setDrafts(next)
  }, [items])

  if (!schema) return null

  const setField = (id, fieldKey, value) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [fieldKey]: value },
    }))
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 2400)
  }

  const saveItem = async (id) => {
    const draft = drafts[id]
    if (!draft) return
    setBusyId(id)
    try {
      await updateCollectionItem(collectionKey, id, draft)
      await refresh()
      showToast('Saved')
    } catch (err) {
      showToast(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const removeItem = async (id) => {
    if (!window.confirm('Delete this person?')) return
    setBusyId(id)
    try {
      await deleteCollectionItem(collectionKey, id)
      await refresh()
      showToast('Deleted')
    } catch (err) {
      showToast(err.message)
    } finally {
      setBusyId(null)
    }
  }

  const addItem = async () => {
    setBusyId('new')
    try {
      const created = await createCollectionItem(collectionKey, blankItem(schema))
      await refresh()
      showToast('Added — fill in details and save')
      setDrafts((prev) => ({ ...prev, [created.id]: { ...created } }))
    } catch (err) {
      showToast(err.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid rgba(255,138,61,0.28)',
        background: 'rgba(255,138,61,0.06)',
      }}
    >
      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ff8a3d', marginBottom: '0.35rem' }}>
        {title}
      </p>
      {hint ? (
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.85rem' }}>
          {hint}
        </p>
      ) : null}

      {items.length ? (
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '0.85rem' }}>
          {items.map((item) => {
            const draft = drafts[item.id] || item
            const titleText = draft[schema.titleField] || `Member #${item.id}`
            return (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.22)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#c4a0ff',
                    marginBottom: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {titleText}
                </p>
                {schema.fields.map((field) => (
                  <CollectionField
                    key={field.key}
                    field={field}
                    value={draft[field.key]}
                    onChange={(value) => setField(item.id, field.key, value)}
                    media={media}
                  />
                ))}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className="admin-btn"
                    disabled={busyId === item.id}
                    onClick={() => saveItem(item.id)}
                  >
                    {busyId === item.id ? 'Saving…' : 'Save member'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    disabled={busyId === item.id}
                    onClick={() => removeItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.85rem' }}>
          {emptyHint}
        </p>
      )}

      <button
        type="button"
        className="admin-btn admin-btn--ghost"
        disabled={busyId === 'new'}
        onClick={addItem}
      >
        {busyId === 'new' ? 'Adding…' : '+ Add team member'}
      </button>

      {toast ? (
        <p style={{ fontSize: '0.75rem', color: '#ff8a3d', marginTop: '0.75rem' }}>{toast}</p>
      ) : null}
    </div>
  )
}
