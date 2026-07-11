import TimezoneRotator from '../TimezoneRotator'
import Motion from '../Motion'

export default function TimezoneStrip() {
  return (
    <section className="py-10 bg-dynasty-cream border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
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
