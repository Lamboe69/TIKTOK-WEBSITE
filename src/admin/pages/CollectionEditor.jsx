import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  uploadImage,
  useContent,
} from '../../cms/ContentContext'
import { blankItem, getCollection } from '../../cms/schema'
import { AdminPage } from '../AdminLayout'

function Field({ field, value, onChange, media }) {
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
          {value ? <img src={value} alt="" /> : <div />}
          <div>
            <input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/photos/example.jpg"
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
                      {m}
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

export default function CollectionList() {
  const { key } = useParams()
  const schema = getCollection(key)
  const { content, loading, refresh } = useContent()
  const [toast, setToast] = useState('')
  const navigate = useNavigate()

  if (!schema) {
    return (
      <AdminPage title="Unknown collection">
        <Link to="/admin" className="admin-btn admin-btn--ghost">
          Back
        </Link>
      </AdminPage>
    )
  }

  const items = Array.isArray(content?.collections?.[key]) ? content.collections[key] : []

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try {
      await deleteCollectionItem(key, id)
      await refresh()
      setToast('Deleted')
    } catch (err) {
      setToast(err.message)
    }
  }

  const duplicate = async (item) => {
    try {
      const { id: _id, ...rest } = item
      await createCollectionItem(key, {
        ...rest,
        id: Date.now(),
        [schema.titleField]: `${item[schema.titleField] || 'Item'} (copy)`,
      })
      await refresh()
      setToast('Duplicated')
    } catch (err) {
      setToast(err.message)
    }
  }

  if (loading) {
    return (
      <AdminPage title={schema.label} lede={schema.description}>
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title={schema.label}
      lede={schema.description}
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className="admin-btn"
            onClick={() => navigate(`/admin/collections/${key}/new`)}
          >
            + Add {schema.label.replace(/s$/, '') || 'item'}
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
    >
      {!items.length ? (
        <div className="admin-empty">
          <p className="admin-empty__title">No {schema.label.toLowerCase()} yet</p>
          <p className="admin-empty__copy">
            Add your first entry. It will show on the live site as soon as you save.
          </p>
          <button
            type="button"
            className="admin-btn"
            onClick={() => navigate(`/admin/collections/${key}/new`)}
          >
            + Add first item
          </button>
        </div>
      ) : (
        <div className="admin-list">
          {items.map((item) => (
            <div key={item.id} className="admin-row">
              <div className="admin-row__lead">
                {item.photo || item.src || item.img || item.cover ? (
                  <img
                    src={item.photo || item.src || item.img || item.cover}
                    alt=""
                    className="admin-row__thumb"
                  />
                ) : null}
                <div>
                  <div className="admin-row__title">
                    {item[schema.titleField] || `#${item.id}`}
                  </div>
                  <div className="admin-row__meta">ID {item.id}</div>
                </div>
              </div>
              <div className="admin-row__actions">
                <Link
                  className="admin-btn admin-btn--ghost"
                  to={`/admin/collections/${key}/${item.id}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="admin-btn admin-btn--ghost"
                  onClick={() => duplicate(item)}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--danger"
                  onClick={() => remove(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}

export function CollectionEdit() {
  const { key, id } = useParams()
  const isNew = id === 'new'
  const schema = getCollection(key)
  const { content, loading, refresh } = useContent()
  const navigate = useNavigate()
  const [draft, setDraft] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!schema || !content) return
    const items = content.collections?.[key] || []
    if (isNew) {
      setDraft(blankItem(schema))
    } else {
      const found = items.find((i) => String(i.id) === String(id))
      setDraft(found ? { ...found } : null)
    }
  }, [schema, content, key, id, isNew])

  if (!schema) {
    return (
      <AdminPage title="Unknown collection">
        <p className="lede">This collection does not exist.</p>
      </AdminPage>
    )
  }
  if (loading || !draft) {
    return (
      <AdminPage title={schema.label}>
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  const media = content?.collections?.mediaLibrary || []

  const setField = (fieldKey, value) => {
    setDraft((d) => ({ ...d, [fieldKey]: value }))
  }

  const save = async (e) => {
    e?.preventDefault?.()
    setBusy(true)
    try {
      if (isNew) {
        const created = await createCollectionItem(key, draft)
        await refresh()
        setToast('Created')
        navigate(`/admin/collections/${key}/${created.id}`)
      } else {
        await updateCollectionItem(key, id, draft)
        await refresh()
        setToast('Saved')
        navigate(`/admin/collections/${key}`)
      }
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminPage
      title={`${isNew ? 'Add' : 'Edit'} · ${schema.label}`}
      lede={
        isNew
          ? `Create a new ${schema.label.replace(/s$/, '').toLowerCase()} entry for the live site.`
          : undefined
      }
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button className="admin-btn" type="button" disabled={busy} onClick={save}>
            {busy ? 'Saving…' : isNew ? 'Create item' : 'Save changes'}
          </button>
          <Link to={`/admin/collections/${key}`} className="admin-btn admin-btn--ghost">
            Cancel
          </Link>
        </div>
      }
    >
      <form className="admin-form" onSubmit={save}>
        {schema.fields.map((field) => (
          <Field
            key={field.key}
            field={field}
            value={draft[field.key]}
            onChange={(v) => setField(field.key, v)}
            media={media}
          />
        ))}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
