import TimezoneRotator from '../TimezoneRotator'
import Motion from '../Motion'

export default function TimezoneStrip() {
  return (
    <section className="py-10 bg-dynasty-cream border-y border-gray-100 relative overflow-hidden">
      {/* Subtle animated accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[200px] h-[100px] bg-dynasty-purple/5 rounded-full blur-[60px] animate-drift" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 right-1/3 w-[150px] h-[80px] bg-dynasty-orange/5 rounded-full blur-[50px] animate-drift" style={{ animationDuration: '8s', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="fade-up">
          <p className="text-xs font-semibold text-dynasty-purple uppercase tracking-wider mb-4">
            King Maker goes live at this time in your region
          </p>
          <TimezoneRotator sourceTime="8:00 PM" />
        </Motion>
      </div>
    </section>
  )
}
