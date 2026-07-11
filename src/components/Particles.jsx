import { useMemo } from 'react'

export default function Particles({ count = 40, color = 'white', className = '' }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      opacity: 0.15 + Math.random() * 0.35,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      driftX: -80 + Math.random() * 160,
      driftY: -100 + Math.random() * 200,
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            backgroundColor: color,
            opacity: d.opacity,
            animation: `particle ${d.duration}s ease-in-out ${d.delay}s infinite`,
            '--drift-x': `${d.driftX}px`,
            '--drift-y': `${d.driftY}px`,
          }}
        />
      ))}
    </div>
  )
}
