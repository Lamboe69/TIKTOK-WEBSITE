import { toDateKey } from '../../utils/scheduleDisplay'

const SEARCH_KEYS = {
  schedule: ['title', 'type', 'date', 'time', 'description'],
  battleCatalog: ['title', 'blurb', 'short', 'tag', 'entryType', 'category'],
}

export const ADMIN_PAGE_SIZE = 5

export function getCollectionPageSize() {
  return ADMIN_PAGE_SIZE
}

export function getCollectionSearchKeys(key, schema) {
  if (SEARCH_KEYS[key]) return SEARCH_KEYS[key]
  const keys = [schema?.titleField].filter(Boolean)
  for (const field of schema?.fields || []) {
    if (field.type === 'text' || field.type === 'textarea') keys.push(field.key)
  }
  return [...new Set(keys)]
}

export function filterCollectionItems(items, { key, schema, query, typeFilter, whenFilter, sort }) {
  let list = [...items]
  const searchKeys = getCollectionSearchKeys(key, schema)
  const q = query.trim().toLowerCase()

  if (q) {
    list = list.filter((item) =>
      searchKeys.some((fieldKey) => String(item[fieldKey] || '').toLowerCase().includes(q)),
    )
  }

  if (key === 'schedule') {
    const today = toDateKey(new Date())

    if (typeFilter && typeFilter !== 'all') {
      list = list.filter((item) => item.type === typeFilter)
    }

    if (whenFilter === 'upcoming') {
      list = list.filter((item) => (item.date || '') >= today)
    } else if (whenFilter === 'past') {
      list = list.filter((item) => (item.date || '') < today)
    }

    const dir = sort === 'date-desc' ? -1 : 1
    list.sort((a, b) => dir * (a.date || '').localeCompare(b.date || ''))
    return list
  }

  if (key === 'battleCatalog' && typeFilter && typeFilter !== 'all') {
    list = list.filter((item) => (item.entryType || '') === typeFilter)
  }

  const titleKey = schema?.titleField || 'title'
  if (sort === 'id-asc') {
    list.sort((a, b) => {
      const na = Number(a.id)
      const nb = Number(b.id)
      if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb
      return String(a.id ?? '').localeCompare(String(b.id ?? ''), undefined, { numeric: true })
    })
  } else if (sort === 'title-desc') {
    list.sort((a, b) => String(b[titleKey] || '').localeCompare(String(a[titleKey] || '')))
  } else {
    list.sort((a, b) => String(a[titleKey] || '').localeCompare(String(b[titleKey] || '')))
  }

  return list
}

export function paginateItems(items, page, pageSize) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    total,
    totalPages,
    page: safePage,
    start: total ? start + 1 : 0,
    end: Math.min(start + pageSize, total),
  }
}

export function scheduleRowMeta(item) {
  const parts = [item.date, item.type, item.time].filter(Boolean)
  return parts.join(' · ') || `ID ${item.id}`
}
