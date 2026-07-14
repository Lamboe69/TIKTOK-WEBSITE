import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { saveContent, saveSettings, uploadImage, useContent } from '../../cms/ContentContext'
import { SETTINGS_FIELDS } from '../../cms/schema'
import { AdminPage } from '../AdminLayout'

export default function SettingsEditor() {
  const { content, loading, refresh } = useContent()
  const [draft, setDraft] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (content) setDraft({ ...(content.settings || {}) })
  }, [content])

  if (loading || !draft) {
    return (
      <AdminPage title="Site settings" lede="Global brand, contact, and CTA defaults.">
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  const save = async (e) => {
    e?.preventDefault?.()
    setBusy(true)
    try {
      await saveSettings(draft)
      await refresh()
      setToast('Settings saved')
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminPage
      title="Site settings"
      lede="Global brand, contact, and CTA defaults."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button className="admin-btn" type="button" disabled={busy} onClick={save}>
            {busy ? 'Saving…' : 'Save settings'}
          </button>
          <Link to="/admin" className="admin-btn admin-btn--ghost">
            Dashboard
          </Link>
        </div>
      }
    >
      <form className="admin-form" onSubmit={save}>
        {SETTINGS_FIELDS.map((field) =>
          field.type === 'textarea' ? (
            <div className="admin-field" key={field.key}>
              <label>{field.label}</label>
              <textarea
                value={draft[field.key] || ''}
                onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
              />
            </div>
          ) : (
            <div className="admin-field" key={field.key}>
              <label>{field.label}</label>
              <input
                value={draft[field.key] || ''}
                onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
              />
            </div>
          ),
        )}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}

export function MediaLibrary() {
  const { content, loading, refresh } = useContent()
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)

  if (loading) {
    return (
      <AdminPage title="Media library" lede="Upload images or reuse existing site assets.">
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  const media = content?.collections?.mediaLibrary || []

  const onUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      await uploadImage(file)
      await refresh()
      setToast('Uploaded')
    } catch (err) {
      setToast(err.message)
    } finally {
      setBusy(false)
      e.target.value = ''
    }
  }

  const remove = async (path) => {
    if (!window.confirm(`Remove ${path} from library? (File stays on disk)`)) return
    const next = {
      ...content,
      collections: {
        ...content.collections,
        mediaLibrary: media.filter((m) => m !== path),
      },
    }
    await saveContent(next)
    await refresh()
    setToast('Removed from library')
  }

  return (
    <AdminPage
      title="Media library"
      lede="Upload images or reuse existing site assets."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <label className="admin-btn" style={{ cursor: busy ? 'wait' : 'pointer' }}>
            {busy ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" hidden disabled={busy} onChange={onUpload} />
          </label>
        </div>
      }
    >
      <div className="admin-media-grid">
        {media.map((path) => (
          <figure key={path} className="admin-media-item">
            <img src={path} alt="" />
            <figcaption>{path}</figcaption>
            <div style={{ padding: '0 0.55rem 0.55rem' }}>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                style={{ width: '100%', fontSize: '0.75rem', padding: '0.45rem' }}
                onClick={() => remove(path)}
              >
                Remove
              </button>
            </div>
          </figure>
        ))}
      </div>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
