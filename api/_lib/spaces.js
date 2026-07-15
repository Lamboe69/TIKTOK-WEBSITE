import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

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

export function publicSpacesUrl(key) {
  const cleanKey = String(key || '').replace(/^\//, '')
  const cdn = String(process.env.DO_SPACES_CDN_URL || '').replace(/\/$/, '')
  if (cdn) return `${cdn}/${cleanKey}`
  const bucket = process.env.DO_SPACES_BUCKET
  return `https://${bucket}.${endpointHost()}/${cleanKey}`
}

export async function uploadBufferToSpaces({ key, body, contentType }) {
  if (!spacesConfigured()) {
    throw new Error('DigitalOcean Spaces is not configured')
  }

  const prefix = String(process.env.DO_SPACES_PREFIX || 'uploads').replace(/^\/+|\/+$/g, '')
  const Key = `${prefix}/${String(key || 'upload').replace(/^\//, '')}`
  const client = new S3Client({
    region: process.env.DO_SPACES_REGION || 'nyc3',
    endpoint: `https://${endpointHost()}`,
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    },
    forcePathStyle: false,
  })

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key,
      Body: body,
      ContentType: contentType || 'application/octet-stream',
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )

  return publicSpacesUrl(Key)
}
