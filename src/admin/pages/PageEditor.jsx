import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { savePage, uploadImage, useContent } from '../../cms/ContentContext'
import { PAGE_SCHEMA } from '../../cms/schema'
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
      <AdminPage title={pageSchema.label} lede="Hero wording and imagery for this page.">
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  const media = content?.collections?.mediaLibrary || []

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

  return (
    <AdminPage
      title={pageSchema.label}
      lede="Hero wording and imagery for this page."
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
        {pageSchema.fields.map((field) => {
          if (field.type === 'image') {
            return (
              <div className="admin-field" key={field.key}>
                <label>{field.label}</label>
                <div className="admin-image-row">
                  {draft[field.key] ? <img src={draft[field.key]} alt="" /> : <div />}
                  <div>
                    <input
                      value={draft[field.key] || ''}
                      onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
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
                            {m}
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
        })}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
