/** Home section layout presets — admin picks in Pages → Home. */

export const HOW_IT_WORKS_LAYOUTS = [
  { id: 'editorial', label: 'Dynasty Editorial', description: 'Split image panel with stacked step cards' },
  { id: 'compass', label: 'Crown Compass', description: 'Steps orbit a glowing battle-map dial' },
  { id: 'spiral', label: 'Ascent Spiral', description: 'Vertical spiral staircase with ember thread' },
  { id: 'tickets', label: 'Arena Tickets', description: 'Torn ticket stubs fanned like a wallet hand' },
]

export const BATTLE_TYPES_LAYOUTS = [
  { id: 'arena', label: 'Arena Stage', description: 'Cinematic panel with vertical battle rail' },
  { id: 'hexpit', label: 'Hex Pit Grid', description: 'Honeycomb pits — click a cell to claim the arena' },
  { id: 'roulette', label: 'Battle Roulette', description: 'Spin the wheel of formats — fate picks your fight' },
  { id: 'vhs', label: 'VHS Tape Deck', description: 'Retro tape carousel with scan-line nostalgia' },
]

export const KM_LOVERS_LAYOUTS = [
  { id: 'guardian', label: 'Guardian Banner', description: 'Full-bleed community photo with pillar copy' },
  { id: 'shieldwall', label: 'Shield Wall', description: 'Hexagonal avatar mosaic protecting the message' },
  { id: 'beacon', label: 'Dynasty Beacon', description: 'Rotating lighthouse beam over floating pillars' },
  { id: 'constellation', label: 'Star Constellation', description: 'Faces as stars linked by glowing orbit lines' },
]

export const WINNERS_LAYOUTS = [
  { id: 'split', label: 'Spotlight Split', description: 'Classic image + numbered step list' },
  { id: 'trophy', label: 'Trophy Case', description: 'Glass vitrine with engraved winner plaques' },
  { id: 'runway', label: 'Red Carpet Runway', description: 'Velvet runway with spotlight step markers' },
  { id: 'coronation', label: 'Coronation Arc', description: 'Crown arch with steps ascending the curve' },
]

export const RECOGNITION_LAYOUTS = [
  { id: 'marquee', label: 'Dual Marquee', description: 'Opposing scroll bands with donate panels' },
  { id: 'throne', label: 'Throne Room', description: 'Gifters and fans seated on opposing thrones' },
  { id: 'tapestry', label: 'Royal Tapestry', description: 'Woven portrait grid with gold-thread borders' },
  { id: 'corridor', label: 'Hall of Mirrors', description: 'Infinite reflection hallway of honor cards' },
]

export const MASTERCLASS_LAYOUTS = [
  { id: 'atelier', label: 'Atelier Editorial', description: 'Angled portrait, curriculum spine, price stamp' },
  { id: 'ledger', label: 'Dynasty Ledger', description: 'Vintage ledger book with wax-seal price' },
  { id: 'broadcast', label: 'Live Broadcast', description: 'CRT test-pattern frame with ticker copy' },
  { id: 'observatory', label: 'Mind Observatory', description: 'Planetarium dome with orbiting week nodes' },
]

export const TESTIMONIALS_LAYOUTS = [
  { id: 'spotlight', label: 'Spotlight Quote', description: 'Rotating portrait with progress bar' },
  { id: 'echo', label: 'Echo Chamber', description: 'Concentric ripples pulsing from the active voice' },
  { id: 'scroll', label: 'Dynasty Scroll', description: 'Horizontal parchment with wax seal avatars' },
  { id: 'mosaic', label: 'Voice Mosaic', description: 'Grid of all voices — active tile expands' },
]

export const CONTACT_TEAM_LAYOUTS = [
  { id: 'credits', label: 'Opening Credits', description: 'Cinematic portrait cards with role credits' },
  { id: 'cards', label: 'Dynasty Cards', description: 'Grid of portrait tiles with hover lift' },
  { id: 'split', label: 'Spotlight Duo', description: 'Bold side-by-side spotlights for key leads' },
  { id: 'lineup', label: 'Roster Strip', description: 'Numbered horizontal lineup with avatars' },
]

export const SECTION_LAYOUT_REGISTRY = {
  howItWorksLayout: { layouts: HOW_IT_WORKS_LAYOUTS, default: 'editorial' },
  battleTypesLayout: { layouts: BATTLE_TYPES_LAYOUTS, default: 'arena' },
  kmLoversLayout: { layouts: KM_LOVERS_LAYOUTS, default: 'guardian' },
  winnersLayout: { layouts: WINNERS_LAYOUTS, default: 'split' },
  recognitionLayout: { layouts: RECOGNITION_LAYOUTS, default: 'marquee' },
  masterclassLayout: { layouts: MASTERCLASS_LAYOUTS, default: 'atelier' },
  testimonialsLayout: { layouts: TESTIMONIALS_LAYOUTS, default: 'spotlight' },
  contactTeamLayout: { layouts: CONTACT_TEAM_LAYOUTS, default: 'credits' },
}

const layoutMetaByField = Object.fromEntries(
  Object.entries(SECTION_LAYOUT_REGISTRY).map(([key, { layouts }]) => [
    key,
    Object.fromEntries(layouts.map((l) => [l.id, l])),
  ]),
)

export function getSectionLayoutMeta(fieldKey) {
  return layoutMetaByField[fieldKey] || null
}

export function normalizeSectionLayout(fieldKey, value) {
  const reg = SECTION_LAYOUT_REGISTRY[fieldKey]
  if (!reg) return value
  const ids = new Set(reg.layouts.map((l) => l.id))
  return ids.has(value) ? value : reg.default
}
