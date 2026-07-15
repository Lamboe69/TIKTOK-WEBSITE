import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function apiDevPlugin() {
  return {
    name: 'api-dev-stats-mock',
    configureServer(server) {
      // Keep TikTok stats mock in Vite; CMS APIs are proxied to Express (:4000)
      server.middlewares.use('/api/stats', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            followers: 50000,
            followersFormatted: '50K+',
            likes: 1000000,
            likesFormatted: '1M+',
            following: null,
            displayName: 'King Maker',
            username: 'kingmakernevergivesup',
            source: 'dev-mock',
            updatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          }),
        )
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    proxy: {
      '/api/admin': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/content': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/collections': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/pages': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/settings': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/media': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/paypal': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/battle-applications': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/charity-applications': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/contact': { target: 'http://localhost:4000', changeOrigin: true },
      '/api/health': { target: 'http://localhost:4000', changeOrigin: true },
      '/uploads': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
})
