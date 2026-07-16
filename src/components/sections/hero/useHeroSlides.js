import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { photos as fallbackPhotos } from '../../../data/photos'
import { normalizeHeroSlides } from '../../../cms/normalize'
import { mediaUrl } from '../../../utils/mediaUrl'

const SLIDE_MS = 3000
const SWIPE_THRESHOLD = 40

export function useHeroSlides(heroSlides) {
  const photos = useMemo(() => {
    const fromCms = normalizeHeroSlides(heroSlides)
    const list = fromCms.length ? fromCms : fallbackPhotos
    return list.map((p) => ({ ...p, src: mediaUrl(p.src) }))
  }, [heroSlides])

  const track = useMemo(() => (photos.length ? [...photos, photos[0]] : []), [photos])
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const animRef = useRef(null)
  const startRef = useRef(0)
  const elapsedRef = useRef(0)
  const touchX = useRef(null)
  const wrapping = useRef(false)

  const total = photos.length
  const realIndex = total ? index % total : 0
  const slide = photos[realIndex] || photos[0]
  const trackCount = track.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const jumpTo = useCallback((nextReal) => {
    if (!total) return
    const target = ((nextReal % total) + total) % total
    wrapping.current = false
    setAnimate(true)
    setIndex(target)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [total])

  const advance = useCallback(() => {
    if (wrapping.current) return
    setIndex((i) => i + 1)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [])

  const next = useCallback(() => {
    if (wrapping.current) return
    setAnimate(true)
    advance()
  }, [advance])

  const prev = useCallback(() => {
    if (wrapping.current || !total) return
    if (index === 0) {
      wrapping.current = true
      setAnimate(false)
      setIndex(total)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          setIndex(total - 1)
          wrapping.current = false
          setProgress(0)
          elapsedRef.current = 0
          startRef.current = performance.now()
        })
      })
      return
    }
    setAnimate(true)
    setIndex((i) => i - 1)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [index, total])

  const onTrackTransitionEnd = useCallback(() => {
    if (index >= total) {
      wrapping.current = true
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          wrapping.current = false
        })
      })
    }
  }, [index, total])

  useEffect(() => {
    if (paused || !total) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      return
    }

    startRef.current = performance.now() - elapsedRef.current

    const tick = (now) => {
      if (wrapping.current) {
        animRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startRef.current
      elapsedRef.current = elapsed
      const p = Math.min(elapsed / SLIDE_MS, 1)
      setProgress(p)
      if (p >= 1) {
        elapsedRef.current = 0
        startRef.current = now
        setProgress(0)
        setIndex((i) => i + 1)
      }
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [paused, total])

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0) next()
    else prev()
  }

  const shouldAnimate = animate && !reducedMotion

  return {
    photos,
    track,
    index,
    realIndex,
    slide,
    total,
    progress,
    paused,
    setPaused,
    shouldAnimate,
    jumpTo,
    next,
    prev,
    onTrackTransitionEnd,
    onTouchStart,
    onTouchEnd,
    trackCount,
  }
}
