import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export function spacesConfigured() {
  return Boolean(
    process.env.DO_SPACES_KEY &&
      process.env.DO_SPACES_SECRET &&
      process.env.DO_SPACES_BUCKET &&
      process.env.DO_SPACES_ENDPOINT,
  )
}

function endpointHost() {
  return String(process.env.DO_SPACES_ENDPOINT || '')
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '')
}

function getClient() {
  return new S3Client({
    region: process.env.DO_SPACES_REGION || 'nyc3',
    endpoint: `https://${endpointHost()}`,
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    },
    forcePathStyle: false,
  })
}

export function publicSpacesUrl(key) {
  const cleanKey = String(key || '').replace(/^\//, '')
  const cdn = String(process.env.DO_SPACES_CDN_URL || '').replace(/\/$/, '')
  if (cdn) return `${cdn}/${cleanKey}`
  const bucket = process.env.DO_SPACES_BUCKET
  return `https://${bucket}.${endpointHost()}/${cleanKey}`
}

export function buildObjectKey(filename) {
  const prefix = String(process.env.DO_SPACES_PREFIX || 'uploads')
    .replace(/^\/+|\/+$/g, '')
  const safe = String(filename || 'upload').replace(/^\/+/, '')
  return `${prefix}/${safe}`
}

/**
 * Upload a buffer to DigitalOcean Spaces. Returns the public URL.
 */
export async function uploadBufferToSpaces({ key, body, contentType }) {
  if (!spacesConfigured()) {
    throw new Error('DigitalOcean Spaces is not configured')
  }

  const client = getClient()
  const Bucket = process.env.DO_SPACES_BUCKET
  const Key = buildObjectKey(key)

  await client.send(
    new PutObjectCommand({
      Bucket,
      Key,
      Body: body,
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  return publicSpacesUrl(Key)
}

export async function deleteFromSpaces(publicUrlOrKey) {
  if (!spacesConfigured()) return false
  const bucket = process.env.DO_SPACES_BUCKET
  const host = endpointHost()
  const cdn = String(process.env.DO_SPACES_CDN_URL || '').replace(/\/$/, '')
  let key = String(publicUrlOrKey || '')

  if (key.startsWith('http')) {
    try {
      const u = new URL(key)
      key = u.pathname.replace(/^\//, '')
      // path-style: /bucket/key
      if (key.startsWith(`${bucket}/`)) key = key.slice(bucket.length + 1)
    } catch {
      return false
    }
  } else {
    key = key.replace(/^\//, '')
  }

  if (!key) return false

  const client = getClient()
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  )
  void host
  void cdn
  return true
}
