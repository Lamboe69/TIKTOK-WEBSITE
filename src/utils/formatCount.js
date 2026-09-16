/** Normalize abbreviated counts so thousand/million/billion suffixes stay uppercase (500K). */
export function normalizeCountAbbrev(value) {
  if (value == null || value === '') return value
  return String(value).replace(/(\d+(?:\.\d+)?)\s*([kmb])(?![a-z])/gi, (_, num, suffix) => {
    return `${num}${suffix.toUpperCase()}`
  })
}

export function formatCount(n) {
  if (n === null || n === undefined) return null
  if (n >= 1_000_000_000) return normalizeCountAbbrev((n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B')
  if (n >= 1_000_000) return normalizeCountAbbrev((n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M')
  if (n >= 1_000) return normalizeCountAbbrev((n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K')
  return String(n)
}
