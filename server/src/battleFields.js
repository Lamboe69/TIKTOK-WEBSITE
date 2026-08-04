/** Shared battle application field rules (mirror src/cms/battleCatalog.js). */

export function battleRequiresCountry(battleLabel) {
  return String(battleLabel || '')
    .toLowerCase()
    .includes('country')
}

export function isSportsCategory(type) {
  return String(type || '').trim().toLowerCase() === 'sports'
}

export function titleLooksLikeSports(title) {
  const t = String(title || '').toLowerCase()
  if (!t) return false
  return (
    t.includes('soccer') ||
    t.includes('football') ||
    t.includes('nfl') ||
    t.includes('nba') ||
    /\bsports?\b/.test(t)
  )
}

export function battleRequiresTeam({ battleLabel, battleType, schedule } = {}) {
  if (isSportsCategory(battleType)) return true
  if (titleLooksLikeSports(battleLabel)) return true

  const label = String(battleLabel || '').trim().toLowerCase()
  if (!label || !Array.isArray(schedule)) return false

  return schedule.some(
    (item) =>
      String(item?.title || '').trim().toLowerCase() === label &&
      isSportsCategory(item?.type),
  )
}
