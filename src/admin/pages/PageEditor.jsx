import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { savePage, uploadImage, useContent } from '../../cms/ContentContext'
import { PAGE_SCHEMA } from '../../cms/schema'
import { mediaLabel, mediaUrl } from '../../utils/mediaUrl'
import { AdminPage } from '../AdminLayout'

export default function PageEditor() {
  const { key } = useParams()
  const pageSchema = PAGE_SCHEMA.find((p) => p.key === key)
  const { content, loading, refresh } = useContent()
  const [draft, setDraft] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!content || !pageSchema) return
    setDraft({ ...(content.pages?.[key] || {}) })
  }, [content, key, pageSchema])

  if (!pageSchema) {
    return (
      <AdminPage title="Unknown page">
        <Link to="/admin" className="admin-btn admin-btn--ghost">
          Back
        </Link>
      </AdminPage>
    )
  }

  if (loading || !draft) {
    return (
      <AdminPage title={pageSchema.label} lede="Edit this page's content.">
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  const media = content?.collections?.mediaLibrary || []

  const heroFields = pageSchema.fields.filter((f) => f.key.startsWith('hero'))
  const bodyFields = pageSchema.fields.filter((f) => !f.key.startsWith('hero'))

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      await savePage(key, draft)
      await refresh()
      setToast('Page saved')
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
    }
  }

  const renderField = (field) => {
    if (field.type === 'image') {
      return (
        <div className="admin-field" key={field.key}>
          <label>{field.label}</label>
          <div className="admin-image-row">
            {draft[field.key] ? <img src={mediaUrl(draft[field.key])} alt="" /> : <div />}
            <div>
              <input
                value={draft[field.key] || ''}
                onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
                placeholder="/photos/… or https://…spaces…"
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
                      setDraft((d) => ({ ...d, [field.key]: path }))
                    }}
                  />
                </label>
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) setDraft({ ...draft, [field.key]: e.target.value })
                  }}
                >
                  <option value="">Pick from library…</option>
                  {media.map((m) => (
                    <option key={m} value={m}>
                      {mediaLabel(m)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (field.type === 'textarea') {
      return (
        <div className="admin-field" key={field.key}>
          <label>{field.label}</label>
          <textarea
            value={draft[field.key] || ''}
            onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
          />
        </div>
      )
    }

    return (
      <div className="admin-field" key={field.key}>
        <label>{field.label}</label>
        <input
          value={draft[field.key] || ''}
          onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
        />
      </div>
    )
  }

  return (
    <AdminPage
      title={pageSchema.label}
      lede="Edit hero and body content for this page."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button className="admin-btn" type="button" disabled={busy} onClick={save}>
            {busy ? 'Saving…' : 'Save page'}
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
    >
      <form className="admin-form" onSubmit={save}>
        {heroFields.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Hero Section
            </h3>
            {heroFields.map(renderField)}
          </div>
        )}
        {bodyFields.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Body Content
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
              Edit the text copy on this page. Leave blank to use defaults.
            </p>
            {bodyFields.map(renderField)}
          </div>
        )}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
