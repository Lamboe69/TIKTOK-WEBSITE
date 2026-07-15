/** Normalize CMS collection rows for public components */
import { mediaUrl } from '../utils/mediaUrl'

export function linesToArray(text) {
  if (Array.isArray(text)) return text
  if (!text) return []
  return String(text)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function normalizeHeroSlides(items = []) {
  return items.map((p) => ({
    src: mediaUrl(p.src),
    alt: p.alt,
    caption: p.caption,
    line: p.line,
    cta: {
      label: p.ctaLabel || p.cta?.label || 'Join My Box Battle',
      action: p.ctaAction || p.cta?.action || 'openOfficial',
    },
  }))
}

export function normalizeAdPackages(items = []) {
  return items.map((p) => ({
    ...p,
    features: linesToArray(p.featuresText || p.features),
  }))
}

export function normalizeMasterclassTiers(items = []) {
  return items.map((t) => ({
    ...t,
    img: mediaUrl(t.img),
    amount: t.amount != null && t.amount !== '' ? Number(t.amount) : t.amount,
    features: linesToArray(t.featuresText || t.features),
  }))
}

export function normalizeAgencyRegions(items = []) {
  return items.map((r) => ({
    ...r,
    img: mediaUrl(r.img),
    benefits: linesToArray(r.benefitsText || r.benefits),
  }))
}

export function normalizeGalleryItems(items = []) {
  return items.map((p) => ({
    ...p,
    src: mediaUrl(p.src),
  }))
}

export function normalizeBlogPosts(items = []) {
  return items.map((p) => ({
    ...p,
    cover: mediaUrl(p.cover),
  }))
}

export function normalizePeoplePhotos(items = []) {
  return items.map((p) => ({
    ...p,
    photo: mediaUrl(p.photo),
  }))
}

export function getTodayQuoteFromList(quotes = []) {
  if (!quotes.length) return null
  const dayIndex = new Date().getDay()
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
  const byDay = quotes.find((q) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return q.day === days[adjustedIndex]
  })
  return byDay || quotes[adjustedIndex % quotes.length]
}
