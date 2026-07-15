#!/bin/bash
# Run on the server: bash deploy/diagnose.sh
# Tells you whether 405 is nginx (not reaching Node) or the API itself.

set -e

DOMAIN="${1:-https://test.kmdynasty.org}"
LOCAL="http://127.0.0.1:4000"

echo "=== KM Dynasty deploy diagnostic ==="
echo ""

echo "1) Is anything listening on port 4000?"
if command -v ss >/dev/null 2>&1; then
  ss -tlnp | grep ':4000' || echo "   NOTHING on :4000 — start API: cd server && npm run start"
else
  lsof -i :4000 || echo "   NOTHING on :4000"
fi
echo ""

echo "2) Direct to Node (bypass nginx): GET /api/health"
curl -sS -D - -o /tmp/km-health-local.txt "$LOCAL/api/health" | head -20
echo "Body: $(cat /tmp/km-health-local.txt)"
echo ""

echo "3) Direct to Node: POST /api/admin/login (wrong password OK — expect 401 JSON)"
curl -sS -D - -o /tmp/km-login-local.txt -X POST "$LOCAL/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"test"}' | head -20
echo "Body: $(head -c 200 /tmp/km-login-local.txt)"
echo ""

echo "4) Through nginx: GET /api/health"
curl -sS -D - -o /tmp/km-health-proxy.txt "$DOMAIN/api/health" | head -20
echo "Body: $(head -c 200 /tmp/km-health-proxy.txt)"
echo ""

echo "5) Through nginx: POST /api/admin/login"
curl -sS -D - -o /tmp/km-login-proxy.txt -X POST "$DOMAIN/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"test"}' | head -20
echo "Body: $(head -c 200 /tmp/km-login-proxy.txt)"
echo ""

echo "=== How to read results ==="
echo "• Step 2–3 JSON + header X-KM-Server: dynasty-api → Node is fine"
echo "• Step 4–5 HTML + nginx/1.24 → request NEVER reached Node — fix nginx"
echo "• Step 2 fails, step 4 fails → API not running (cd server && npm run start)"
echo "• Step 2 OK, step 4 fails → nginx not proxying to :4000"
echo ""
echo "Active nginx for domain:"
sudo nginx -T 2>/dev/null | grep -B2 -A30 "test.kmdynasty.org" | head -40 || echo "(run as user with sudo)"
