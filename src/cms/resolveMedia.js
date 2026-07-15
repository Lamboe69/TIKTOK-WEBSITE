import { COLLECTIONS, PAGE_SCHEMA } from './schema'
import { mediaUrl } from '../utils/mediaUrl'

const PAGE_IMAGE_KEYS = new Map(
  PAGE_SCHEMA.map((page) => [
    page.key,
    page.fields.filter((f) => f.type === 'image').map((f) => f.key),
  ]),
)

const COLLECTION_IMAGE_KEYS = new Map(
  COLLECTIONS.map((col) => [
    col.key,
    col.fields.filter((f) => f.type === 'image').map((f) => f.key),
  ]),
)

/** Comma-separated image path lists stored as text in page data */
const COMMA_IMAGE_KEYS = new Set(['kmLoversFaces'])

function resolveValue(key, value) {
  if (value == null || value === '') return value
  if (COMMA_IMAGE_KEYS.has(key) && typeof value === 'string') {
    return value
      .split(',')
      .map((part) => mediaUrl(part.trim()))
      .filter(Boolean)
      .join(', ')
  }
  if (typeof value === 'string') return mediaUrl(value)
  return value
}

function resolveRecord(record, imageKeys) {
  if (!record || typeof record !== 'object' || !imageKeys?.length) return record
  let next = null
  for (const key of imageKeys) {
    if (!(key in record)) continue
    const resolved = resolveValue(key, record[key])
    if (resolved !== record[key]) {
      if (!next) next = { ...record }
      next[key] = resolved
    }
  }
  return next || record
}

/**
 * Resolve gallery paths (/photos/…) and DigitalOcean Spaces URLs for display.
 * Idempotent for absolute site paths and full https URLs.
 */
export function resolveContentMedia(content) {
  if (!content || typeof content !== 'object') return content

  const pages = content.pages || {}
  const collections = content.collections || {}
  let pagesChanged = false
  let collectionsChanged = false
  const nextPages = {}
  const nextCollections = {}

  for (const [key, page] of Object.entries(pages)) {
    const imageKeys = [
      ...(PAGE_IMAGE_KEYS.get(key) || []),
      ...[...COMMA_IMAGE_KEYS],
    ]
    const resolved = resolveRecord(page, imageKeys)
    nextPages[key] = resolved
    if (resolved !== page) pagesChanged = true
  }

  for (const [key, items] of Object.entries(collections)) {
    if (key === 'mediaLibrary' && Array.isArray(items)) {
      nextCollections[key] = items
      continue
    }
    if (!Array.isArray(items)) {
      nextCollections[key] = items
      continue
    }
    const imageKeys = COLLECTION_IMAGE_KEYS.get(key) || ['src', 'img', 'photo', 'cover']
    let listChanged = false
    const resolvedList = items.map((item) => {
      const resolved = resolveRecord(item, imageKeys)
      if (resolved !== item) listChanged = true
      return resolved
    })
    nextCollections[key] = listChanged ? resolvedList : items
    if (listChanged) collectionsChanged = true
  }

  if (!pagesChanged && !collectionsChanged) return content
  return {
    ...content,
    pages: pagesChanged ? nextPages : pages,
    collections: collectionsChanged ? nextCollections : collections,
  }
}
