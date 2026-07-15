import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

export default function GiveBack() {
  const { settings } = useContent()
  const siteName = settings.siteName || ''
  const paypalEmail = settings.paypalEmail || ''

  return (
    <section className="relative overflow-hidden" style={{ background: '#120620' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        {/* Story plane */}
        <div className="relative min-h-[320px]">
          <img
            src="/photos/community-giving.jpg"
            alt="Community impact"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, transparent 30%, #120620), linear-gradient(to top, rgba(18,6,32,0.85) 0%, transparent 50%)',
            }}
          />
          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-16 max-w-md">
            <p className="sec-kicker mb-3">Giving Back</p>
            <p className="font-display font-bold text-ivory text-2xl sm:text-3xl leading-tight mb-3">
              Battles build crowns.<br />Charity builds kinship.
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              Giveaways, creator support, and charity drives — the Dynasty lifts as it rises.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 sm:px-10 lg:px-14 py-14 sm:py-16 flex flex-col justify-center gap-10">
          <Motion delay={80}>
            <div>
              <h3 className="font-display font-bold text-ivory text-xl mb-2">Support the mission</h3>
              <p className="text-white/45 text-sm mb-5 max-w-sm leading-relaxed">
                Help expand the Dynasty and support creators worldwide.
              </p>
              <form action="https://www.paypal.com/donate" method="post" target="_blank" onSubmit={(e) => { if (!paypalEmail) { e.preventDefault(); alert('Donations coming soon — the admin will configure PayPal in Settings.'); } }}>
                  <input type="hidden" name="business" value={paypalEmail} />
                  <input type="hidden" name="no_recurring" value="0" />
                  <input type="hidden" name="item_name" value={`${siteName} Donation`} />
                  <input type="hidden" name="currency_code" value="USD" />
                  <input type="hidden" name="amount" value="" />
                  <button
                    type="submit"
                    className="sec-cta"
                  >
                    <span className="w-4 h-4 block">{Icons.heart}</span>
                    Donate with PayPal
                  </button>
                </form>
            </div>
          </Motion>

          <Motion delay={160}>
            <div className="border-t border-white/[0.07] pt-10">
              <h3 className="font-display font-bold text-ivory text-xl mb-2">Apply for Charity</h3>
              <p className="text-white/45 text-sm mb-5 max-w-sm leading-relaxed">
                Your story matters. Submit your application and our team will review it personally.
              </p>
              <Link to="/outreach#charity-apply" className="sec-cta-ghost border border-white/15 px-5 py-3 hover:border-white/30 inline-flex">
                Apply now
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}
