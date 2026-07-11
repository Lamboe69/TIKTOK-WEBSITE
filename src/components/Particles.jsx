import { useMemo } from 'react'

export default function Particles({ count = 30, color = 'white', className = '' }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.25,
      duration: 8 + Math.random() * 16,
      delay: Math.random() * 10,
      driftX: -30 + Math.random() * 60,
      driftY: -40 + Math.random() * 80,
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full animate-particle"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: color,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            '--drift-x': `${d.driftX}px`,
            '--drift-y': `${d.driftY}px`,
          }}
        />
      ))}
    </div>
  )
}
