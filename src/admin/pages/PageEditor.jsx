import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { savePage, uploadImage, useContent } from '../../cms/ContentContext'
import { PAGE_SCHEMA } from '../../cms/schema'
import { HERO_LAYOUTS } from '../../components/sections/hero/heroLayouts'
import { getSectionLayoutMeta } from '../../cms/sectionLayouts'
import { mediaLabel, mediaUrl } from '../../utils/mediaUrl'
import { AdminPage } from '../AdminLayout'
import InlineCollectionEditor from '../components/InlineCollectionEditor'

const CONTACT_SECTIONS = [
  { id: 'hero', label: 'Hero', match: (key) => key.startsWith('hero') },
  { id: 'form', label: 'Write form', match: (key) => key.startsWith('form') },
  {
    id: 'team',
    label: 'Contact Team',
    match: (key) => key.startsWith('team') || key === 'contactTeamLayout',
  },
  {
    id: 'hq',
    label: 'HQ & map',
    match: (key) => key.startsWith('hq'),
    collections: [{ key: 'contactLines', label: 'Contact lines (phones, email, hours)' }],
  },
]

const CONTACT_COLLECTION_LINKS = [
  { key: 'contactTeam', label: 'Contact team', desc: 'People on the Contact page' },
  { key: 'contactTopics', label: 'Form topics', desc: 'Message topic buttons in the write form' },
  { key: 'contactLines', label: 'Contact lines', desc: 'Top strip + HQ link row' },
]

const ABOUT_CAST_KEYS = ['castHeading', 'castDescription']

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
  const isContactPage = key === 'contact'
  const isAboutPage = key === 'about'

  const heroFields = pageSchema.fields.filter((f) => f.key.startsWith('hero'))
  const bodyFields = pageSchema.fields.filter((f) => !f.key.startsWith('hero'))
  const aboutCastFields = isAboutPage
    ? bodyFields.filter((f) => ABOUT_CAST_KEYS.includes(f.key))
    : []
  const aboutOtherFields = isAboutPage
    ? bodyFields.filter((f) => !ABOUT_CAST_KEYS.includes(f.key))
    : bodyFields

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

    if (field.type === 'select') {
      const layoutMeta = field.key === 'heroLayout'
        ? Object.fromEntries(HERO_LAYOUTS.map((l) => [l.id, l]))
        : getSectionLayoutMeta(field.key)

      const isLayoutField = field.key === 'heroLayout' || Boolean(layoutMeta)

      return (
        <div className="admin-field" key={field.key}>
          <label>{field.label}</label>
          <select
            value={draft[field.key] || (field.options?.[0] ?? '')}
            onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
          >
            {(field.options || []).map((o) => (
              <option key={o} value={o}>
                {layoutMeta?.[o] ? `${layoutMeta[o].label} — ${layoutMeta[o].description}` : o}
              </option>
            ))}
          </select>
          {isLayoutField ? (
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
              Switch anytime — content stays the same; only the presentation changes.
            </p>
          ) : null}
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

  const renderContactTeamRoster = () => (
    <InlineCollectionEditor
      collectionKey="contactTeam"
      title="Team members"
      hint="Edit names, roles, photos, and links here. Changes go live as soon as you save each member."
      emptyHint="No team members saved yet — the live site shows built-in defaults until you add your own."
    />
  )

  const renderContactSections = () => (
    <>
      {CONTACT_SECTIONS.map((section) => {
        const fields = bodyFields.filter((f) => section.match(f.key))
        if (!fields.length && !section.collections?.length) return null
        return (
          <div key={section.id} style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {section.label}
            </h3>
            {section.id === 'team' ? (
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
                Pick a design and headings below, then edit each team member inline.
              </p>
            ) : null}
            {fields.map(renderField)}
            {section.id === 'team' ? renderContactTeamRoster() : null}
          </div>
        )
      })}
    </>
  )

  return (
    <AdminPage
      title={pageSchema.label}
      lede={isContactPage
        ? 'Edit hero, form copy, Contact Team design, and HQ. Edit team members inline in the Contact Team section.'
        : isAboutPage
          ? 'Edit About copy and the Opening Credits cast inline below.'
          : 'Edit hero and body content for this page.'}
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
            {isContactPage ? (
              renderContactSections()
            ) : isAboutPage ? (
              <>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Body Content
                </h3>
                {aboutOtherFields.map(renderField)}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Opening Credits Cast
                  </h3>
                  {aboutCastFields.map(renderField)}
                  <InlineCollectionEditor
                    collectionKey="aboutCast"
                    title="Cast members"
                    hint="People shown in the Opening Credits section on the About page."
                    emptyHint="No cast saved yet — the live site shows built-in defaults until you add your own."
                  />
                </div>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Body Content
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
                  Edit the text copy on this page. Leave blank to use defaults.
                </p>
                {bodyFields.map(renderField)}
              </>
            )}
          </div>
        )}
        {isContactPage ? (
          <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid rgba(255,138,61,0.25)', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c4a0ff', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Contact collections
            </h3>
            <div className="admin-grid">
              {CONTACT_COLLECTION_LINKS.map((c) => (
                <Link key={c.key} to={`/admin/collections/${c.key}`} className="admin-card">
                  <strong>{c.label}</strong>
                  <span>{c.desc}</span>
                </Link>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem' }}>
              Form topics: add, remove, or reorder items in Collections → Contact form topics.
            </p>
          </div>
        ) : null}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
