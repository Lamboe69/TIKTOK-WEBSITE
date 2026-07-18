import Motion from './Motion'

const LIVESTREAM_ZONES = [
  { region: 'US CST', time: '3:30 PM' },
  { region: 'US EST', time: '4:30 PM' },
  {
    lines: [
      { region: 'UK', time: '9:30 PM' },
      { region: 'Nigeria', time: '9:30 PM' },
    ],
  },
  { region: 'EAT', time: '11:30 PM' },
]

export default function StatBar() {
  return (
    <section className="relative overflow-hidden home-band-violet home-band-sep" aria-label="Daily livestream time zones">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.18), transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Motion variant="fade-up">
          <p className="sec-kicker text-center mb-5 opacity-85" style={{ letterSpacing: '0.28em' }}>
            Daily Livestream Time Zones
          </p>
          <div className="stat-ticker">
            {LIVESTREAM_ZONES.map((zone) => (
              <div
                key={zone.region || zone.lines?.map((l) => l.region).join('-')}
                className="stat-cell text-center sm:text-left"
              >
                {zone.lines ? (
                  <div className="space-y-3">
                    {zone.lines.map(({ region, time }) => (
                      <div key={region}>
                        <p
                          className="font-display font-extrabold text-ivory block leading-none tracking-tight tabular-nums"
                          style={{ fontSize: 'clamp(1.35rem, 3vw, 2.15rem)' }}
                        >
                          {time}
                        </p>
                        <p className="text-white/75 text-xs font-medium mt-1.5 tracking-wide uppercase">{region}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p
                      className="font-display font-extrabold text-ivory block leading-none tracking-tight tabular-nums"
                      style={{ fontSize: 'clamp(1.65rem, 3.8vw, 2.75rem)' }}
                    >
                      {zone.time}
                    </p>
                    <p className="text-white/75 text-xs font-medium mt-3 tracking-wide uppercase">{zone.region}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </Motion>
      </div>
    </section>
  )
}
