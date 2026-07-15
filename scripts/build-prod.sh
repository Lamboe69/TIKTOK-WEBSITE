#!/usr/bin/env bash
# Build frontend for production (API at api.kmdynasty.org) and print deploy hint.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building frontend (VITE_API_URL from .env.production)..."
npm run build

echo ""
echo "Deploy to server:"
echo "  sudo rsync -av --delete dist/ /var/www/km-dynasty/dist/"
echo ""
echo "Verify:"
echo "  curl -s https://test.kmdynasty.org/km-config.js"
echo "  curl -s https://api.kmdynasty.org/api/health"
