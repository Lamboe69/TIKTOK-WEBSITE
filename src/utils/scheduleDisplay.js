import { getBattleDate } from './battle'

export const TYPE_IMAGES = {
  'Daily Godsent': '/battles-photos/daily-godsent.jpg',
  'Most Beautiful': '/battles-photos/most-beautiful.jpg',
  Country: '/battles-photos/country.jpg',
  Scavengers: '/battles-photos/scavengers.jpg',
  Sports: '/battles-photos/scavengers.jpg',
  'Champion of Champions': '/battles-photos/champion-of-champions.jpg',
}

export const TYPE_ACCENT = {
  'Daily Godsent': '#FF6B1A',
  'Most Beautiful': '#E8B94A',
  Country: '#C4A0FF',
  Scavengers: '#FF8A3D',
  Sports: '#2E8B57',
  'Champion of Champions': '#E8B94A',
}

export function getBattleImage(battle) {
  if (!battle) return TYPE_IMAGES['Daily Godsent']
  if (battle.image) return battle.image
  return TYPE_IMAGES[battle.type] || TYPE_IMAGES['Daily Godsent']
}

export function getBattleAccent(battle) {
  if (!battle?.type) return '#FF6B1A'
  return TYPE_ACCENT[battle.type] || '#FF6B1A'
}

export function formatScheduleDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    weekdayLong: d.toLocaleDateString('en-US', { weekday: 'long' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate(),
    iso: dateStr,
  }
}

export function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getUpcomingBattles(schedule, count = 3) {
  if (!Array.isArray(schedule) || !schedule.length) return []

  const now = new Date()
  const today = toDateKey(now)

  const ranked = [...schedule]
    .filter((b) => b?.date)
    .map((b) => {
      const start = getBattleDate(b.date, b.time)
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
      return { ...b, dateObj: start, endObj: end }
    })
    .filter((b) => b.date >= today || b.endObj > now)
    .sort((a, b) => a.dateObj - b.dateObj)

  return ranked.slice(0, count)
}

export function resolveScheduleList(cmsSchedule, fallbackSchedule) {
  const cms = Array.isArray(cmsSchedule) ? cmsSchedule : []
  if (getUpcomingBattles(cms, 1).length) return cms
  if (getUpcomingBattles(fallbackSchedule, 1).length) return fallbackSchedule
  return cms.length ? cms : fallbackSchedule
}

/** Battles falling within the next `days` calendar days (inclusive of today). */
export function getHorizonBattles(schedule, days = 30) {
  return getNextNDays(schedule, days).flatMap((day) => day.battles)
}

/** @deprecated Prefer getHorizonBattles(schedule, 7) */
export function getWeekBattles(schedule) {
  return getHorizonBattles(schedule, 7)
}

/** Build day slots for today through today+(n-1). */
export function getNextNDays(schedule, n = 30) {
  const total = Math.max(1, Number(n) || 30)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const byDate = new Map()
  for (const battle of schedule || []) {
    if (!battle?.date) continue
    if (!byDate.has(battle.date)) byDate.set(battle.date, [])
    byDate.get(battle.date).push(battle)
  }

  const days = []
  for (let i = 0; i < total; i += 1) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const iso = toDateKey(d)
    const battles = (byDate.get(iso) || []).sort((a, b) =>
      String(a.time || '').localeCompare(String(b.time || '')),
    )
    days.push({
      date: iso,
      label: formatScheduleDay(iso),
      isToday: i === 0,
      isTomorrow: i === 1,
      battles,
      primary: battles[0] || null,
    })
  }
  return days
}

/** @deprecated Prefer getNextNDays(schedule, 7) */
export function getNextSevenDays(schedule) {
  return getNextNDays(schedule, 7)
}

export function chunkItems(items, size) {
  const list = Array.isArray(items) ? items : []
  const pageSize = Math.max(1, Number(size) || 1)
  const pages = []
  for (let i = 0; i < list.length; i += pageSize) {
    pages.push(list.slice(i, i + pageSize))
  }
  return pages.length ? pages : [[]]
}

export function parseDisplayTime(timeStr) {
  if (!timeStr) return { hour: '—', minute: '—', dayPeriod: '' }
  const match = String(timeStr).trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
  if (!match) return { hour: timeStr, minute: '', dayPeriod: '' }
  return {
    hour: match[1],
    minute: match[2],
    dayPeriod: (match[3] || '').toUpperCase(),
  }
}

export function groupLivestreamRegions(regions) {
  const cells = []
  const seenGroups = new Set()
  for (const region of regions) {
    if (region.group) {
      if (seenGroups.has(region.group)) continue
      seenGroups.add(region.group)
      cells.push({
        key: region.group,
        lines: regions.filter((r) => r.group === region.group),
      })
    } else {
      cells.push({ key: String(region.id), region: region.region, time: region.time })
    }
  }
  return cells
}
