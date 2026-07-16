/** Home hero slider layout presets — admin picks one in Pages → Home. */
export const HERO_LAYOUTS = [
  {
    id: 'carousel',
    label: 'Arena Panorama',
    description: 'Cinematic horizontal glide with peek frames and ember scan line',
  },
  {
    id: 'fade',
    label: 'Cinema Reel',
    description: 'Letterbox crossfade with film-perf edge and slow zoom',
  },
  {
    id: 'split',
    label: 'Dynasty Editorial',
    description: 'Bold 50/50 split — image left, full brand panel right',
  },
  {
    id: 'spotlight',
    label: 'Crown Halo',
    description: 'Radiant center spotlight with pulsing ring and watermark',
  },
  {
    id: 'stack',
    label: 'Battle Deck',
    description: 'Fan of battle cards that lift and shuffle forward',
  },
  {
    id: 'aurora',
    label: 'Northern Lights',
    description: 'Dreamy aurora ribbons drifting over luminous crossfades',
  },
  {
    id: 'prism',
    label: 'Crown Jewel',
    description: 'Slides viewed through a giant triangular gem with chromatic facets',
  },
  {
    id: 'orbit',
    label: 'Orbital Crown',
    description: '3D carousel ring — slides orbit and snap to the throne',
  },
  {
    id: 'velvet',
    label: 'Velvet Stage',
    description: 'Theater curtains part with gold fringe to reveal the arena',
  },
  {
    id: 'mosaic',
    label: 'Living Mosaic',
    description: 'Tile grid that flips and reassembles into each new image',
  },
]

export const DEFAULT_HERO_LAYOUT = 'carousel'

const LAYOUT_IDS = new Set(HERO_LAYOUTS.map((l) => l.id))

export function normalizeHeroLayout(value) {
  return LAYOUT_IDS.has(value) ? value : DEFAULT_HERO_LAYOUT
}
