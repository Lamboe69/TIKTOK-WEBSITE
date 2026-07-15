import { mediaUrl } from '../utils/mediaUrl'

/** Drop-in img that accepts gallery paths or full Spaces/CDN URLs. */
export default function MediaImg({ src, fallback = '', alt = '', ...props }) {
  const resolved = mediaUrl(src, fallback)
  if (!resolved) return null
  return <img src={resolved} alt={alt} {...props} />
}
