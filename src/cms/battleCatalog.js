/** Shared battle types — homepage mosaic + signup form dropdown */

export const OFFICIAL_BATTLE_LABEL = 'Official Godsent Box Battle'

export const FALLBACK_BATTLE_CATALOG = [
  {
    id: 'official',
    title: OFFICIAL_BATTLE_LABEL,
    blurb: 'The flagship arena. 1M target — 15 Lions reward for the champion who owns the night.',
    img: '/battles-photos/daily-godsent.jpg',
    entryType: 'official',
    short: 'Official',
    tag: '1M Target · 15 Lions',
    accent: '#FF6B1A',
  },
  {
    id: 'beautiful',
    title: 'Most Beautiful/Handsome Box Battle',
    blurb: 'Grace, presence, and style — where beauty meets the battle.',
    img: '/battles-photos/most-beautiful.jpg',
    entryType: 'special',
    short: 'Beautiful',
    tag: 'Showcase',
    accent: '#E8B94A',
  },
  {
    id: 'country',
    title: 'Country Box Battle',
    blurb: 'Rep your flag. National pride in the TikTok arena.',
    img: '/battles-photos/country.jpg',
    entryType: 'special',
    short: 'Country',
    tag: 'Nations',
    accent: '#C4A0FF',
  },
  {
    id: 'soccer',
    title: 'Soccer/Football Box Battle',
    blurb: 'Football fever in the box. 500K target — 3 Lions reward.',
    img: '/battles-photos/scavengers.jpg',
    entryType: 'special',
    short: 'Soccer',
    tag: '500K · 3 Lions',
    accent: '#FF8A3D',
  },
  {
    id: 'nfl',
    title: 'NFL/National Football League Box Battle',
    blurb: 'Gridiron glory live on TikTok. 100K target — Vault Gift reward.',
    img: '/photos/battle-highlights.jpg',
    entryType: 'special',
    short: 'NFL',
    tag: '100K · Vault Gift',
    accent: '#E8B94A',
  },
  {
    id: 'nba',
    title: 'NBA Box Battle',
    blurb: 'Hoops energy in the Dynasty arena — fast breaks, big gifts, bigger crowns.',
    img: '/battles-photos/champion-of-champions.jpg',
    entryType: 'special',
    short: 'NBA',
    tag: 'Courtside',
    accent: '#FF6B1A',
  },
]

const ACCENT_CYCLE = ['#FF6B1A', '#E8B94A', '#C4A0FF', '#FF8A3D', '#E8B94A', '#FF6B1A']

/** Sort by numeric position ID ascending (1 first). */
export function compareBattleCatalogOrder(a, b) {
  const na = Number(a?.id)
  const nb = Number(b?.id)
  if (Number.isFinite(na) && Number.isFinite(nb) && na !== nb) return na - nb
  return String(a?.id ?? '').localeCompare(String(b?.id ?? ''), undefined, { numeric: true })
}

function inferEntryType(title, index) {
  if (!title) return index === 0 ? 'official' : 'special'
  const t = title.toLowerCase()
  if (t.includes('official godsent')) return 'official'
  if (t.includes('champion of champions')) return 'official'
  if (t.includes('daily godsent')) return 'official'
  return 'special'
}

/** Normalize CMS battle types for UI + signup form */
export function normalizeBattleCatalog(items) {
  const source = Array.isArray(items) && items.length > 0 ? items : FALLBACK_BATTLE_CATALOG
  const ordered = [...source].sort(compareBattleCatalogOrder)

  return ordered.map((item, i) => {
    const entryType = item.entryType || inferEntryType(item.title, i)
    const category = isSportsCategory(item.category) || titleLooksLikeSports(item.title)
      ? 'Sports'
      : 'General'
    return {
      id: String(item.id ?? i + 1),
      title: item.title || '',
      blurb: item.blurb || item.description || '',
      img: item.img || '',
      entryType,
      category,
      short: item.short || item.title?.split(/[\s/]/)[0] || 'Battle',
      tag: item.tag || (entryType === 'official' ? 'Official' : 'Battle'),
      accent: item.accent || ACCENT_CYCLE[i % ACCENT_CYCLE.length],
    }
  })
}

/** Dropdown options grouped for the signup modal */
export function battleCatalogToFormOptions(catalog) {
  const battles = normalizeBattleCatalog(catalog)
  const official = battles.filter((b) => b.entryType === 'official')
  const special = battles.filter((b) => b.entryType === 'special')

  return [
    ...official.map((b) => ({
      value: b.title,
      entryType: 'official',
      group: 'Official',
      category: b.category,
    })),
    ...special.map((b) => ({
      value: b.title,
      entryType: 'special',
      group: 'Special',
      category: b.category,
    })),
  ]
}

export function defaultOfficialBattleLabel(catalog) {
  const battles = normalizeBattleCatalog(catalog)
  return battles.find((b) => b.entryType === 'official')?.title || OFFICIAL_BATTLE_LABEL
}

/** Country field only applies when the battle name includes "country". */
export function battleRequiresCountry(battleLabel) {
  return String(battleLabel || '')
    .toLowerCase()
    .includes('country')
}

export function isSportsCategory(type) {
  return String(type || '').trim().toLowerCase() === 'sports'
}

/** Sports formats by title when no schedule category is set yet. */
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

/**
 * Team field applies when the battle is under Sports (or sports-named).
 * Prefer explicit catalog category / schedule type so admins can control this.
 */
export function battleRequiresTeam({ battleLabel, battleType, schedule, catalog } = {}) {
  if (isSportsCategory(battleType)) return true
  if (titleLooksLikeSports(battleLabel)) return true

  const label = String(battleLabel || '').trim().toLowerCase()
  if (!label) return false

  if (Array.isArray(catalog) && catalog.length) {
    const match = normalizeBattleCatalog(catalog).find(
      (b) => String(b.title || '').trim().toLowerCase() === label,
    )
    if (match && isSportsCategory(match.category)) return true
  }

  if (!Array.isArray(schedule)) return false

  return schedule.some(
    (item) =>
      String(item?.title || '').trim().toLowerCase() === label &&
      isSportsCategory(item?.type),
  )
}

/** Map a catalog battle title to the schedule filter type (Daily Godsent, etc.) */
export function inferScheduleTypeFromTitle(title, battleTypes = [], category) {
  if (isSportsCategory(category)) return 'Sports'
  const t = String(title || '').toLowerCase()
  const types = battleTypes.filter((x) => x && x !== 'All')
  if (titleLooksLikeSports(title) && types.some((type) => isSportsCategory(type))) {
    return types.find((type) => isSportsCategory(type)) || 'Sports'
  }
  for (const type of types) {
    if (t.includes(type.toLowerCase())) return type
  }
  if (t.includes('godsent') || t.includes('official')) return 'Daily Godsent'
  if (t.includes('beautiful') || t.includes('handsome')) return 'Most Beautiful'
  if (t.includes('country')) return 'Country'
  if (t.includes('scavenger')) return 'Scavengers'
  if (t.includes('champion')) return 'Champion of Champions'
  if (titleLooksLikeSports(title)) return 'Sports'
  return types[0] || 'Daily Godsent'
}

export function scheduleFieldsFromCatalogBattle(battle, battleTypes = []) {
  if (!battle) return {}
  const category = battle.category || (titleLooksLikeSports(battle.title) ? 'Sports' : 'General')
  return {
    title: battle.title,
    type: inferScheduleTypeFromTitle(battle.title, battleTypes, category),
    description: battle.blurb || '',
    image: battle.img || '',
  }
}
