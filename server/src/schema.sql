-- KM Dynasty CMS schema
CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT 'Admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id         INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  data       JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pages (
  key        TEXT PRIMARY KEY,
  data       JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scalars / arrays that aren't item lists (battleTypes, categories, meta objects)
CREATE TABLE IF NOT EXISTS collection_blobs (
  key        TEXT PRIMARY KEY,
  data       JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collection_items (
  id             BIGSERIAL PRIMARY KEY,
  collection_key TEXT NOT NULL,
  item_id        TEXT NOT NULL,
  sort_order     INT NOT NULL DEFAULT 0,
  data           JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (collection_key, item_id)
);

CREATE INDEX IF NOT EXISTS idx_collection_items_key_sort
  ON collection_items (collection_key, sort_order, id);

CREATE TABLE IF NOT EXISTS media (
  id           BIGSERIAL PRIMARY KEY,
  path         TEXT NOT NULL UNIQUE,
  filename     TEXT NOT NULL,
  mime_type    TEXT,
  size_bytes   INT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_meta (
  id         INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  version    INT NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS masterclass_enrollments (
  id                BIGSERIAL PRIMARY KEY,
  tier_id           TEXT NOT NULL,
  tier_name         TEXT NOT NULL,
  amount_cents      INT NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD',
  buyer_name        TEXT NOT NULL,
  buyer_email       TEXT NOT NULL,
  buyer_phone       TEXT,
  status            TEXT NOT NULL DEFAULT 'pending',
  paypal_order_id   TEXT,
  paypal_capture_id TEXT,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at           TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_paypal_order
  ON masterclass_enrollments (paypal_order_id)
  WHERE paypal_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_enrollments_status_created
  ON masterclass_enrollments (status, created_at DESC);

CREATE TABLE IF NOT EXISTS battle_applications (
  id              BIGSERIAL PRIMARY KEY,
  entry_type      TEXT NOT NULL DEFAULT 'official',
  battle_label    TEXT NOT NULL,
  full_name       TEXT NOT NULL DEFAULT '',
  tiktok_handle   TEXT NOT NULL,
  followers       INT,
  available_date  DATE,
  league_level    TEXT,
  badge_number    TEXT,
  has_community   TEXT,
  highest_coins   BIGINT,
  status          TEXT NOT NULL DEFAULT 'new',
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_battle_apps_status_created
  ON battle_applications (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_battle_apps_entry_type
  ON battle_applications (entry_type, created_at DESC);

CREATE TABLE IF NOT EXISTS contact_messages (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  topic        TEXT NOT NULL DEFAULT 'General Question',
  message      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'new',
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at  TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status_created
  ON contact_messages (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_topic_created
  ON contact_messages (topic, created_at DESC);

INSERT INTO site_settings (id, data) VALUES (1, '{}'::jsonb)
  ON CONFLICT (id) DO NOTHING;

INSERT INTO content_meta (id, version) VALUES (1, 1)
  ON CONFLICT (id) DO NOTHING;
