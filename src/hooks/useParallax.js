import { useRef, useEffect, useState } from 'react'

export default function useParallax({ factor = 0.15, disabled = false } = {}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return

    const handleScroll = () => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const centerY = rect.top + rect.height / 2
      const viewportCenter = viewportH / 2
      const dist = (centerY - viewportCenter) / viewportH
      setOffset(dist * factor * 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [factor, disabled])

  return [ref, { transform: `translateY(${offset}px)` }]
}
