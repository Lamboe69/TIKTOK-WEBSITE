const spacingMap = {
  sm: 'py-6',
  md: 'py-10',
  lg: 'py-14',
  none: 'py-0',
}

export default function SectionDivider({ spacing = 'md' }) {
  return (
    <div className={`relative flex items-center justify-center ${spacingMap[spacing] || spacingMap.md}`}>
      {/* Gradient line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.2) 20%, rgba(255,107,26,0.4) 50%, rgba(255,107,26,0.2) 80%, transparent)',
        }}
      />
      {/* Glow orb */}
      <div
        className="relative w-1.5 h-1.5 rounded-full"
        style={{
          background: '#FF6B1A',
          boxShadow: '0 0 12px rgba(255,107,26,0.4), 0 0 30px rgba(255,107,26,0.15)',
        }}
      />
    </div>
  )
}
