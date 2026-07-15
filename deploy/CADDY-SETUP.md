# Caddy setup — KM Dynasty (api.kmdynasty.org + test.kmdynasty.org)

## 1. DNS

At your domain registrar, add **A records** pointing to your server IP:

| Host | Type | Value |
|------|------|--------|
| `test` | A | `YOUR_SERVER_IP` |
| `api` | A | `YOUR_SERVER_IP` |

Wait a few minutes, then check:

```bash
dig +short test.kmdynasty.org
dig +short api.kmdynasty.org
```

Both should return your server IP.

---

## 2. Stop nginx (Caddy needs ports 80 and 443)

```bash
sudo systemctl stop nginx
sudo systemctl disable nginx
```

If you must keep nginx temporarily, Caddy cannot bind to 80/443 on the same machine.

---

## 3. Install Caddy (Ubuntu)

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

sudo apt update
sudo apt install -y caddy
```

---

## 4. Caddyfile

```bash
cd ~/TIKTOK-WEBSITE
git pull
sudo cp deploy/Caddyfile.example /etc/caddy/Caddyfile
sudo nano /etc/caddy/Caddyfile
```

Confirm domains and static path match your server.

Validate and reload:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl enable caddy
sudo systemctl status caddy
```

Caddy will **automatically** get HTTPS certificates for both hostnames.

---

## 5. Backend (`server/.env`)

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

Start API with systemd:

```bash
cd ~/TIKTOK-WEBSITE/server
npm install
npm run setup          # first time only

sudo cp ~/TIKTOK-WEBSITE/deploy/km-api.service.example /etc/systemd/system/km-api.service
sudo nano /etc/systemd/system/km-api.service   # set User= and WorkingDirectory=

sudo systemctl daemon-reload
sudo systemctl enable km-api
sudo systemctl start km-api
sudo systemctl status km-api
```

Test API directly:

```bash
curl -s http://127.0.0.1:4000/api/health
curl -s https://api.kmdynasty.org/api/health
```

Both should return JSON with `X-KM-Server: dynasty-api`.

---

## 6. Frontend build (must point at API subdomain)

From repo root:

```bash
cd ~/TIKTOK-WEBSITE
VITE_API_URL=https://api.kmdynasty.org npm run build
sudo mkdir -p /var/www/km-dynasty/dist
sudo rsync -av --delete dist/ /var/www/km-dynasty/dist/
```

**Or** without rebuild — edit on server after deploy:

```bash
sudo nano /var/www/km-dynasty/dist/km-config.js
```

```js
window.__KM_CONFIG__ = {
  apiUrl: 'https://api.kmdynasty.org',
}
```

---

## 7. Verify in browser

1. Open `https://test.kmdynasty.org`
2. DevTools → Network → filter `api`
3. You should see calls to `https://api.kmdynasty.org/api/content`
4. Login: `https://test.kmdynasty.org/admin/login`
5. `POST https://api.kmdynasty.org/api/admin/login` → JSON (not 405 HTML)

---

## 8. Logs

```bash
# Caddy
sudo journalctl -u caddy -f

# API
journalctl -u km-api -f
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Certificate error | DNS not pointing to server yet — wait and reload caddy |
| API CORS error | Express already allows all origins; ensure API URL is `https://api.kmdynasty.org` |
| Still calls `/api/` on test domain | Rebuild with `VITE_API_URL` or fix `km-config.js` |
| Connection refused on API subdomain | `systemctl status km-api` — API not running |
| Port 80 in use | Stop nginx: `sudo systemctl stop nginx` |
