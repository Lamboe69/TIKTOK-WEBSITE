import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function apiDevPlugin() {
  return {
    name: 'api-dev-mock',
    configureServer(server) {
      server.middlewares.use('/api/stats', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')

        // Return the cached stats if available, otherwise nulls
        // On Vercel, the real api/stats.js handler runs instead
        const response = {
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
        }
        res.end(JSON.stringify(response))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
})
