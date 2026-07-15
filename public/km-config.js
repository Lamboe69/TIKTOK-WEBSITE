/**
 * Runtime config — edit on the server without rebuilding.
 * Leave apiUrl empty for local dev (Vite proxies /api to :4000).
 * Production with API subdomain:
 *   apiUrl: 'https://api.kmdynasty.org'
 */
window.__KM_CONFIG__ = {
  apiUrl: 'https://api.kmdynasty.org',
}
