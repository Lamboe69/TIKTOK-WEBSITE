import siteContentSeed from '../../data/site-content.json'

/** Bundled defaults — used until /api/content loads (e.g. admin login before CMS fetch). */
export const DEFAULT_SETTINGS = siteContentSeed.settings || {}
export const DEFAULT_PAGES = siteContentSeed.pages || {}
export const DEFAULT_COLLECTIONS = siteContentSeed.collections || {}

export function mergeSettings(live = {}) {
  return { ...DEFAULT_SETTINGS, ...live }
}
