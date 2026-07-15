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
| GET | `/api/paypal/config` | — | Public PayPal client id + mode |
| POST | `/api/paypal/reserve` | — | Reserve seat without PayPal (pending) |
| POST | `/api/paypal/create-order` | — | Start masterclass checkout |
| POST | `/api/paypal/capture-order` | — | Capture after buyer approval |
| POST | `/api/battle-applications` | — | Submit box battle signup |
| GET | `/api/admin/battle-applications` | Bearer | List applications (`?status=&type=`) |
| PATCH | `/api/admin/battle-applications/:id` | Bearer | Update notes / status |
| GET | `/api/admin/enrollments` | Bearer | List enrollments (`?status=`) |
| GET | `/api/admin/enrollments/:id` | Bearer | One enrollment |
| PATCH | `/api/admin/enrollments/:id` | Bearer | Update notes / status |

## PayPal masterclass checkout

1. Create a REST app in the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications).
2. Put `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, and `PAYPAL_MODE` (`sandbox` or `live`) in `server/.env`.
3. Restart the API. On `/masterclass`, tier CTAs open a checkout modal and charge via PayPal.
4. Paid bookings appear under **Admin → Enrollments**.

Each masterclass tier should have an `amount` field (USD number) in the CMS; display `price` can stay as `"$500"`.

## DigitalOcean Spaces (media uploads)

When Spaces credentials are set, admin photo uploads go to the bucket and the CMS stores the **public URL**. Without them, files go to `public/uploads` as `/uploads/…`.

```bash
DO_SPACES_KEY=
DO_SPACES_SECRET=
DO_SPACES_BUCKET=
DO_SPACES_ENDPOINT=nyc3.digitaloceanspaces.com   # host only, no https://
DO_SPACES_REGION=nyc3
DO_SPACES_CDN_URL=https://your-bucket.nyc3.cdn.digitaloceanspaces.com  # optional
DO_SPACES_PREFIX=uploads
```

1. Create a Space and an API key with write access.
2. Set the bucket to **public** files (or use a CDN that serves them).
3. Restart the API. **Admin → Media** should say uploads go to Spaces.
4. Image fields accept either a gallery path (`/photos/…`) or a full Spaces/CDN URL.

`GET /api/media/config` reports `{ storage: "spaces" | "local" }`.

## Database

Database name: **dynasty**

Tables: `admins`, `site_settings`, `pages`, `collection_blobs`, `collection_items`, `media`, `content_meta`, `masterclass_enrollments`
