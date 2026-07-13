import { useRef, useEffect } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let particles = []
    let width, height

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Re-init particles on resize
      const count = Math.min(80, Math.floor(width * height / 12000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.2 + 0.05),
        size: 1 + Math.random() * 2.5,
        opacity: 0.15 + Math.random() * 0.35,
        hue: Math.random() > 0.7 ? 25 : 0, // 25 = ember orange hue, 0 = white
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    // Pause when tab hidden
    let hidden = false
    const onVis = () => { hidden = document.hidden }
    document.addEventListener('visibilitychange', onVis)

    let lastTime = 0
    function tick(now) {
      if (!hidden) {
        const dt = Math.min(now - lastTime, 50) // cap at ~20fps equivalent
        lastTime = now

        ctx.clearRect(0, 0, width, height)

        for (const p of particles) {
          p.x += p.vx * (dt / 16)
          p.y += p.vy * (dt / 16)

          // Wrap
          if (p.x < -5) p.x = width + 5
          if (p.x > width + 5) p.x = -5
          if (p.y < -5) p.y = height + 5

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          if (p.hue === 25) {
            ctx.fillStyle = `rgba(255, 107, 26, ${p.opacity})`
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`
          }
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
