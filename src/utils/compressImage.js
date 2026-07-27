/** Max size per screenshot before we try to compress (bytes). */
export const MAX_SCREENSHOT_BYTES = 4 * 1024 * 1024

/** Target max after compression — keeps two files under typical nginx limits. */
const TARGET_MAX_BYTES = 1.5 * 1024 * 1024

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read that image file'))
    }
    img.src = url
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not compress image'))
      },
      type,
      quality,
    )
  })
}

/**
 * Resize and re-encode screenshots so uploads stay small (follower / gifting proofs).
 * Returns the original file when already small enough or compression fails.
 */
export async function compressScreenshot(file, { maxWidth = 1920, maxHeight = 1920 } = {}) {
  if (!file?.type?.startsWith('image/')) return file
  if (file.size <= TARGET_MAX_BYTES) return file

  try {
    const img = await loadImageFromFile(file)
    let { width, height } = img
    const scale = Math.min(1, maxWidth / width, maxHeight / height)
    width = Math.max(1, Math.round(width * scale))
    height = Math.max(1, Math.round(height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(img, 0, 0, width, height)

    const outputType = file.type === 'image/png' ? 'image/jpeg' : file.type || 'image/jpeg'
    let quality = 0.88
    let blob = await canvasToBlob(canvas, outputType, quality)

    while (blob.size > TARGET_MAX_BYTES && quality > 0.45) {
      quality -= 0.1
      blob = await canvasToBlob(canvas, outputType, quality)
    }

    const baseName = (file.name || 'screenshot').replace(/\.[^.]+$/, '')
    const ext = outputType === 'image/png' ? '.png' : '.jpg'
    return new File([blob], `${baseName}${ext}`, { type: outputType, lastModified: Date.now() })
  } catch {
    return file
  }
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
