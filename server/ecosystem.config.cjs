/** PM2 — production backend only (nginx serves frontend static files)
 *  cd server && pm2 start ecosystem.config.cjs
 *  pm2 save && pm2 startup
 */
module.exports = {
  apps: [
    {
      name: 'km-api',
      script: 'src/index.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
      // Loads server/.env via dotenv in index.js (path relative to src/)
    },
  ],
}
