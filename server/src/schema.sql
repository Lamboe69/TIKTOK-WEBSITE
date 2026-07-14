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

INSERT INTO site_settings (id, data) VALUES (1, '{}'::jsonb)
  ON CONFLICT (id) DO NOTHING;

INSERT INTO content_meta (id, version) VALUES (1, 1)
  ON CONFLICT (id) DO NOTHING;
