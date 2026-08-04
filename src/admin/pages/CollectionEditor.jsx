import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createCollectionItem,
  deleteCollectionItem,
  updateCollectionItem,
  uploadImage,
  useContent,
} from '../../cms/ContentContext'
import { blankItem, getCollection } from '../../cms/schema'
import { mediaLabel, mediaUrl } from '../../utils/mediaUrl'
import { AdminPage } from '../AdminLayout'
import { BattleTitleField } from '../components/BattleTitleField'
import { AdminFilterChips, AdminPagination, AdminSearchBar } from '../components/AdminListControls'
import {
  filterCollectionItems,
  getCollectionPageSize,
  paginateItems,
  scheduleRowMeta,
} from '../utils/collectionList'
import { withSportsCategory } from '../../data/schedule'

export function Field({ field, value, onChange, media }) {
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

  if (field.type === 'number') {
    return (
      <div className="admin-field">
        <label>{field.label}</label>
        <input
          type="number"
          min={1}
          step={1}
          inputMode="numeric"
          value={value ?? ''}
          placeholder={field.placeholder || ''}
          onChange={(e) => onChange(e.target.value === '' ? '' : e.target.value)}
        />
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
              placeholder="/photos/example.jpg or https://…spaces…"
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

export default function CollectionList() {
  const { key } = useParams()
  const schema = getCollection(key)
  const { content, loading, refresh } = useContent()
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [whenFilter, setWhenFilter] = useState('all')
  const [sort, setSort] = useState(key === 'schedule' ? 'date-asc' : key === 'battleCatalog' ? 'id-asc' : 'title-asc')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery('')
    setTypeFilter('all')
    setWhenFilter('all')
    setSort(key === 'schedule' ? 'date-asc' : key === 'battleCatalog' ? 'id-asc' : 'title-asc')
    setPage(1)
  }, [key])

  useEffect(() => {
    setPage(1)
  }, [query, typeFilter, whenFilter, sort])

  const items = schema && Array.isArray(content?.collections?.[key]) ? content.collections[key] : []
  const pageSize = getCollectionPageSize()

  const scheduleTypeOptions = useMemo(() => {
    const fromCms = (content?.collections?.battleTypes || []).filter((t) => t && t !== 'All')
    const fromItems = [...new Set(items.map((item) => item.type).filter(Boolean))]
    return withSportsCategory(fromCms.length ? fromCms : fromItems)
  }, [content?.collections?.battleTypes, items])

  const typeCounts = useMemo(() => {
    const map = {}
    for (const item of items) {
      const typeKey = key === 'battleCatalog' ? item.entryType || 'unknown' : item.type || 'Unknown'
      map[typeKey] = (map[typeKey] || 0) + 1
    }
    return map
  }, [items, key])

  const whenCounts = useMemo(() => {
    if (key !== 'schedule') return {}
    const today = new Date().toISOString().slice(0, 10)
    let upcoming = 0
    let past = 0
    for (const item of items) {
      if ((item.date || '') >= today) upcoming += 1
      else past += 1
    }
    return { upcoming, past }
  }, [items, key])

  const filtered = useMemo(
    () =>
      schema
        ? filterCollectionItems(items, {
            key,
            schema,
            query,
            typeFilter,
            whenFilter,
            sort,
          })
        : [],
    [items, key, schema, query, typeFilter, whenFilter, sort],
  )

  const pagination = useMemo(
    () => paginateItems(filtered, page, pageSize),
    [filtered, page, pageSize],
  )

  const typeFilters = useMemo(() => {
    if (key === 'schedule') {
      return [
        { key: 'all', label: 'All types', count: items.length },
        ...scheduleTypeOptions.map((type) => ({
          key: type,
          label: type,
          count: typeCounts[type] || 0,
        })),
      ]
    }
    if (key === 'battleCatalog') {
      return [
        { key: 'all', label: 'All battles', count: items.length },
        { key: 'official', label: 'Official', count: typeCounts.official || 0 },
        { key: 'special', label: 'Special', count: typeCounts.special || 0 },
      ]
    }
    return []
  }, [key, items.length, scheduleTypeOptions, typeCounts])

  const whenFilters =
    key === 'schedule'
      ? [
          { key: 'all', label: 'All dates', count: items.length },
          { key: 'upcoming', label: 'Upcoming', count: whenCounts.upcoming || 0 },
          { key: 'past', label: 'Past', count: whenCounts.past || 0 },
        ]
      : []

  if (!schema) {
    return (
      <AdminPage title="Unknown collection">
        <Link to="/admin" className="admin-btn admin-btn--ghost">
          Back
        </Link>
      </AdminPage>
    )
  }

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
      const payload = {
        ...rest,
        [schema.titleField]: `${item[schema.titleField] || 'Item'} (copy)`,
      }
      if (key === 'battleCatalog') {
        const nums = items.map((i) => Number(i.id)).filter((n) => Number.isFinite(n))
        payload.id = nums.length ? Math.max(...nums) + 1 : 1
      } else {
        payload.id = Date.now()
      }
      await createCollectionItem(key, payload)
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
          {key === 'schedule' ? (
            <Link to="/admin/schedule/week" className="admin-btn">
              Next 7 days editor
            </Link>
          ) : null}
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
      search={
        items.length ? (
          <AdminSearchBar
            variant="header"
            value={query}
            onChange={setQuery}
            placeholder={
              key === 'schedule'
                ? 'Search title, type, date, time…'
                : `Search ${schema.label.toLowerCase()}…`
            }
          />
        ) : null
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
        <>
          <div className="admin-list-controls">
            {typeFilters.length > 0 ? (
              <AdminFilterChips filters={typeFilters} value={typeFilter} onChange={setTypeFilter} />
            ) : null}

            {whenFilters.length > 0 ? (
              <AdminFilterChips filters={whenFilters} value={whenFilter} onChange={setWhenFilter} />
            ) : null}

            {key === 'schedule' ? (
              <div className="admin-list-controls__sort">
                <label htmlFor="schedule-sort">Sort</label>
                <select id="schedule-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="date-asc">Date · soonest first</option>
                  <option value="date-desc">Date · latest first</option>
                </select>
              </div>
            ) : null}

            {key === 'battleCatalog' ? (
              <div className="admin-list-controls__sort">
                <label htmlFor="battle-sort">Sort</label>
                <select id="battle-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="id-asc">Position ID · 1 first</option>
                  <option value="title-asc">Title · A–Z</option>
                  <option value="title-desc">Title · Z–A</option>
                </select>
              </div>
            ) : null}

            <AdminPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              start={pagination.start}
              end={pagination.end}
              onChange={setPage}
            />
          </div>

          {!pagination.items.length ? (
            <div className="admin-empty">
              <p className="admin-empty__title">No matches</p>
              <p className="admin-empty__copy">
                Try a different search or filter. {filtered.length === 0 && items.length ? '' : ''}
              </p>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => {
                  setQuery('')
                  setTypeFilter('all')
                  setWhenFilter('all')
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="admin-list">
              {pagination.items.map((item) => (
                <div key={item.id} className="admin-row">
                  <div className="admin-row__lead">
                    {item.photo || item.src || item.img || item.cover || item.image ? (
                      <img
                        src={mediaUrl(item.photo || item.src || item.img || item.cover || item.image)}
                        alt=""
                        className="admin-row__thumb"
                      />
                    ) : null}
                    <div>
                      <div className="admin-row__title">
                        {item[schema.titleField] || `#${item.id}`}
                      </div>
                      <div className="admin-row__meta">
                        {key === 'schedule'
                          ? scheduleRowMeta(item)
                          : key === 'battleCatalog'
                            ? [
                                item.entryType || 'special',
                                item.category === 'Sports' || String(item.category).toLowerCase() === 'sports'
                                  ? 'Sports'
                                  : null,
                                `ID ${item.id}`,
                              ]
                                .filter(Boolean)
                                .join(' · ')
                            : `ID ${item.id}`}
                      </div>
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

          {pagination.total > 0 ? (
            <div className="admin-list-controls admin-list-controls--foot">
              <AdminPagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                start={pagination.start}
                end={pagination.end}
                onChange={setPage}
              />
            </div>
          ) : null}
        </>
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
      const draft = blankItem(schema)
      if (schema.editableId || key === 'battleCatalog') {
        const nums = items.map((i) => Number(i.id)).filter((n) => Number.isFinite(n))
        draft.id = nums.length ? Math.max(...nums) + 1 : 1
      }
      setDraft(draft)
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
  if (loading) {
    return (
      <AdminPage title={schema.label}>
        <p className="lede">Loading…</p>
      </AdminPage>
    )
  }

  if (!draft) {
    return (
      <AdminPage title={schema.label}>
        <p className="lede">This item was not found. It may not have saved — go back and try creating it again.</p>
        <Link to={`/admin/collections/${key}`} className="admin-btn admin-btn--ghost">
          Back to list
        </Link>
      </AdminPage>
    )
  }

  const media = content?.collections?.mediaLibrary || []
  const battleCatalog = content?.collections?.battleCatalog
  const battleTypes = withSportsCategory(
    (content?.collections?.battleTypes || []).filter((t) => t && t !== 'All'),
  )

  const setField = (fieldKey, value) => {
    setDraft((d) => ({ ...d, [fieldKey]: value }))
  }

  const applyCatalogBattle = (fields) => {
    setDraft((d) => ({ ...d, ...fields }))
  }

  const save = async (e) => {
    e?.preventDefault?.()
    setBusy(true)
    try {
      if (schema.editableId || key === 'battleCatalog') {
        const position = Number(draft.id)
        if (!Number.isFinite(position) || position < 1 || !Number.isInteger(position)) {
          throw new Error('Position ID must be a whole number of 1 or higher')
        }
      }
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
        {schema.fields.map((field) =>
          key === 'schedule' && field.key === 'title' ? (
            <BattleTitleField
              key={field.key}
              value={draft[field.key]}
              onChange={(v) => setField(field.key, v)}
              catalog={battleCatalog}
              battleTypes={battleTypes}
              onApplyBattle={applyCatalogBattle}
            />
          ) : (
            <Field
              key={field.key}
              field={field}
              value={draft[field.key]}
              onChange={(v) => setField(field.key, v)}
              media={media}
            />
          ),
        )}
      </form>
      {toast ? <div className="admin-toast">{toast}</div> : null}
    </AdminPage>
  )
}
