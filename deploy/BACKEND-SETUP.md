# Backend only — api.kmdynasty.org
#
# Frontend (test.kmdynasty.org) is already working — do not change it.
# This guide sets up ONLY the API subdomain + Express process.

## Overview

```
test.kmdynasty.org     → nginx (unchanged) → static React files
api.kmdynasty.org      → nginx (new)       → Express :4000
```

Frontend must call `https://api.kmdynasty.org` (see step 5).

---

## Step 1 — DNS

Add an **A record**:

| Host | Type | Value |
|------|------|--------|
| `api` | A | your server IP (same as test) |

```bash
dig +short api.kmdynasty.org
```

---

## Step 2 — `server/.env`

```bash
cd ~/TIKTOK-WEBSITE/server
nano .env
```

```env
PORT=4000
HOST=127.0.0.1
SERVE_STATIC=0

DATABASE_URL=postgresql://your_user:your_password@localhost:5432/dynasty
ADMIN_EMAIL=admin@kmdynasty.com
ADMIN_PASSWORD=your-strong-password
JWT_SECRET=your-long-random-secret
JWT_TTL=7d
```

First time:

```bash
npm install
npm run setup
```

---

## Step 3 — Run API with systemd

```bash
sudo cp ~/TIKTOK-WEBSITE/deploy/km-api.service.example /etc/systemd/system/km-api.service
sudo nano /etc/systemd/system/km-api.service
```

Set `User=` and `WorkingDirectory=` to your paths.

```bash
sudo systemctl daemon-reload
sudo systemctl enable km-api
sudo systemctl start km-api
sudo systemctl status km-api
```

**Test Node directly (must work before nginx):**

```bash
curl -s http://127.0.0.1:4000/api/health
```

Expect JSON like `{"ok":true,...}`.

```bash
curl -i -X POST http://127.0.0.1:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"YOUR_PASSWORD"}'
```

Expect JSON (`401` wrong password is OK — means Node works).

---

## Step 4 — nginx for `api.kmdynasty.org` only

Do **not** edit your `test.kmdynasty.org` config.

```bash
sudo cp ~/TIKTOK-WEBSITE/deploy/nginx-api-only.conf.example \
  /etc/nginx/sites-available/api.kmdynasty.org

sudo ln -sf /etc/nginx/sites-available/api.kmdynasty.org \
  /etc/nginx/sites-enabled/api.kmdynasty.org

sudo certbot --nginx -d api.kmdynasty.org
sudo nginx -t && sudo systemctl reload nginx
```

**Test through public URL:**

```bash
curl -s https://api.kmdynasty.org/api/health
```

Expect JSON + header `X-KM-Server: dynasty-api`.

---

## Step 5 — Tell the frontend where the API is

Your site on **test.kmdynasty.org** must call **api.kmdynasty.org**.

**Quick fix (no rebuild)** — edit on server:

```bash
sudo nano /var/www/km-dynasty/dist/km-config.js
```

```js
window.__KM_CONFIG__ = {
  apiUrl: 'https://api.kmdynasty.org',
}
```

**Or rebuild:**

```bash
cd ~/TIKTOK-WEBSITE
VITE_API_URL=https://api.kmdynasty.org npm run build
sudo rsync -av --delete dist/ /var/www/km-dynasty/dist/
```

Hard refresh browser (incognito).

---

## Step 6 — Verify login

1. Open `https://test.kmdynasty.org/admin/login`
2. DevTools → Network
3. Login should `POST` to **`https://api.kmdynasty.org/api/admin/login`**
4. Response = JSON with `token`, not HTML 405

---

## Logs

```bash
journalctl -u km-api -f          # API
sudo tail -f /var/log/nginx/error.log
```

---

## Checklist

- [ ] `dig api.kmdynasty.org` → server IP
- [ ] `curl http://127.0.0.1:4000/api/health` → JSON
- [ ] `curl https://api.kmdynasty.org/api/health` → JSON
- [ ] `km-config.js` has `apiUrl: 'https://api.kmdynasty.org'`
- [ ] Login POST goes to api.kmdynasty.org
