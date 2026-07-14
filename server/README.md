# Dynasty CMS API (Node + Postgres)

## Setup

```bash
# 1) Database (already created as `dynasty` for local user)
createdb dynasty   # if needed

# 2) Install + migrate + seed
cd server
npm install
cp .env.example .env
npm run setup      # migrate + seed from data/site-content.json

# 3) Run API
npm run dev        # http://localhost:4000
```

From the repo root, run the Vite app separately (`npm run dev`). Vite proxies admin/CMS API calls to `:4000`.

## Auth

- Default admin: `admin@kmdynasty.com` / `km-dynasty-admin` (password-only login also works with the existing admin UI)
- Override with `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET` in `server/.env`

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | DB health |
| POST | `/api/admin/login` | — | `{ password }` or `{ email, password }` → JWT |
| GET | `/api/admin/me` | Bearer | Session check |
| POST | `/api/admin/upload` | Bearer | Base64 image upload (admin UI) |
| GET | `/api/content` | — | Full CMS document |
| PUT | `/api/content` | Bearer | Replace full CMS document |
| GET | `/api/settings` | — | Site settings |
| PUT | `/api/settings` | Bearer | Update settings |
| GET | `/api/pages` | — | All pages |
| GET/PUT/DELETE | `/api/pages/:key` | PUT/DELETE auth | Page hero/copy |
| GET | `/api/collections` | Bearer | All collections |
| GET | `/api/collections/:key` | — | One collection |
| PUT | `/api/collections/:key` | Bearer | Replace collection |
| POST | `/api/collections/:key/items` | Bearer | Create item |
| PUT | `/api/collections/:key/items/:id` | Bearer | Update item |
| DELETE | `/api/collections/:key/items/:id` | Bearer | Delete item |
| GET | `/api/media` | — | Media library rows |
| POST | `/api/media/upload` | Bearer | multipart file |
| POST | `/api/media/upload-json` | Bearer | base64 JSON |
| DELETE | `/api/media` | Bearer | `{ path }` remove from library |

## Database

Database name: **dynasty**

Tables: `admins`, `site_settings`, `pages`, `collection_blobs`, `collection_items`, `media`, `content_meta`
