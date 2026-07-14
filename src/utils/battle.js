const TIMEZONES = [
  { iana: 'America/Chicago', label: 'CT', flag: '🇺🇸' },
  { iana: 'America/New_York', label: 'ET', flag: '🇺🇸' },
  { iana: 'Europe/London', label: 'UK', flag: '🇬🇧' },
  { iana: 'Africa/Lagos', label: 'NG', flag: '🇳🇬' },
  { iana: 'Africa/Kampala', label: 'UG', flag: '🇺🇬' },
]

export function parseSourceTime(timeStr) {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!match) return { hours: 20, minutes: 0 }
  let h = parseInt(match[1])
  const m = parseInt(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return { hours: h, minutes: m }
}

export function getBattleDate(dateStr, timeStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const { hours, minutes } = parseSourceTime(timeStr)
  d.setHours(hours, minutes, 0, 0)
  return d
}

export function convertTimezones(dateStr, timeStr) {
  const date = getBattleDate(dateStr, timeStr)
  return TIMEZONES.map(({ iana, label, flag }) => {
    try {
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: iana,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date)
      return { label, flag, time: formatted }
    } catch {
      return { label, flag, time: '—' }
    }
  })
}

export function getBattleStatus(dateStr, timeStr) {
  const now = new Date()
  const battleDate = getBattleDate(dateStr, timeStr)
  const endEstimate = new Date(battleDate.getTime() + 2 * 60 * 60 * 1000)

  if (now >= battleDate && now <= endEstimate) return 'live'
  if (now.toDateString() === battleDate.toDateString()) return 'today'
  if (battleDate > now) return 'upcoming'
  return 'past'
}

export function getCountdown(target) {
  const diff = target - new Date()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0) return `${days}d ${hours}h ${mins}m`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

export function downloadICS(battle) {
  const date = getBattleDate(battle.date, battle.time)
  const end = new Date(date.getTime() + 2 * 60 * 60 * 1000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dynasty//Battle Schedule//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(date)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${battle.title}`,
    `DESCRIPTION:${battle.description}`,
    'LOCATION:TikTok Live - @kingmakernevergivesup',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${battle.title.replace(/\s+/g, '-').toLowerCase()}-${battle.date}.ics`
  a.click()
  URL.revokeObjectURL(url)
}
