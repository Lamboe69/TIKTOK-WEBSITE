import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../cms/ContentContext'
import { COLLECTIONS, PAGE_SCHEMA } from '../../cms/schema'
import { AdminPage } from '../AdminLayout'

export default function AdminDashboard() {
  const { content, loading, error, collections } = useContent()

  const stats = useMemo(() => {
    const keys = [
      ['schedule', 'Battles'],
      ['blogPosts', 'Posts'],
      ['gallery', 'Gallery'],
      ['faq', 'FAQ'],
      ['testimonials', 'Testimonials'],
      ['heroSlides', 'Hero slides'],
    ]
    return keys.map(([k, label]) => ({
      label,
      count: Array.isArray(collections[k]) ? collections[k].length : 0,
    }))
  }, [collections])

  if (loading) {
    return (
      <AdminPage title="Dashboard" lede="Loading content…">
        <p className="lede">Please wait.</p>
      </AdminPage>
    )
  }

  if (error) {
    return (
      <AdminPage title="Dashboard" lede="Could not load content">
        <p className="lede">{error}</p>
      </AdminPage>
    )
  }

  return (
    <AdminPage
      title="Dashboard"
      lede="Edit every page and collection on the public site. Changes save to the content store and show up immediately after publish."
      actions={
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => {
              const blob = new Blob([JSON.stringify(content, null, 2)], {
                type: 'application/json',
              })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `km-site-content-v${content?.version || 1}.json`
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            Export JSON backup
          </button>
          <label className="admin-btn admin-btn--ghost" style={{ cursor: 'pointer' }}>
            Import JSON
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                try {
                  const text = await file.text()
                  const parsed = JSON.parse(text)
                  const { saveContent } = await import('../../cms/ContentContext')
                  await saveContent(parsed)
                  window.location.reload()
                } catch (err) {
                  alert(err.message || 'Import failed')
                }
                e.target.value = ''
              }}
            />
          </label>
        </div>
      }
    >
      <p className="admin-side__section" style={{ marginTop: 0 }}>
        Quick add
      </p>
      <div className="admin-quick">
        {[
          ['topGifters', 'Top gifter'],
          ['topFans', 'Top fan'],
          ['testimonials', 'Testimonial'],
          ['schedule', 'Battle'],
          ['blogPosts', 'Blog post'],
          ['gallery', 'Gallery photo'],
          ['faq', 'FAQ item'],
          ['heroSlides', 'Hero slide'],
          ['adPackages', 'Ad package'],
          ['agencyRegions', 'Agency region'],
        ].map(([key, label]) => (
          <Link key={key} to={`/admin/collections/${key}/new`}>
            <strong>+ {label}</strong>
            <span>Create new</span>
          </Link>
        ))}
      </div>

      <p className="admin-side__section" style={{ marginTop: 0 }}>
        Payments &amp; applications
      </p>
      <div className="admin-grid" style={{ marginBottom: '1.75rem' }}>
        <Link to="/admin/enrollments" className="admin-card">
          <strong>Masterclass enrollments</strong>
          <span>View PayPal bookings &amp; capture IDs</span>
        </Link>
        <Link to="/admin/applications" className="admin-card">
          <strong>Box battle applications</strong>
          <span>Official &amp; special battle signups</span>
        </Link>
      </div>

      <div className="admin-stats">
        {stats.map((s) => (
          <div key={s.label} className="admin-stat">
            <strong>{s.count}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <p className="admin-side__section" style={{ marginTop: 0 }}>
        Pages
      </p>
      <div className="admin-grid" style={{ marginBottom: '1.75rem' }}>
        {PAGE_SCHEMA.map((p) => (
          <Link key={p.key} to={`/admin/pages/${p.key}`} className="admin-card">
            <strong>{p.label}</strong>
            <span>Hero copy & imagery</span>
          </Link>
        ))}
      </div>

      <p className="admin-side__section">Collections</p>
      <div className="admin-grid">
        {COLLECTIONS.map((c) => (
          <Link key={c.key} to={`/admin/collections/${c.key}`} className="admin-card">
            <strong>{c.label}</strong>
            <span>{c.description}</span>
            <em>
              {Array.isArray(collections[c.key]) ? collections[c.key].length : 0} items
            </em>
          </Link>
        ))}
      </div>

      <p className="lede" style={{ marginTop: '2rem', fontSize: '0.8rem' }}>
        Last updated: {content?.updatedAt ? new Date(content.updatedAt).toLocaleString() : '—'} ·
        version {content?.version ?? '—'}
      </p>
    </AdminPage>
  )
}
