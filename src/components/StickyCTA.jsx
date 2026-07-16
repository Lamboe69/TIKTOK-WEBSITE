import { useLocation } from 'react-router-dom'
import { useSignUp } from './SignUpContext'
import { useContent } from '../cms/ContentContext'
import { BATTLE_SUBMIT_LABEL } from '../constants/brand'
import { Icons } from './Icons'

export default function StickyCTA() {
  const { pathname } = useLocation()
  const { openOfficial, openSpecial } = useSignUp()
  const { settings } = useContent()

  const isSpecialPage = pathname === '/daily-quotes'
  const label = isSpecialPage ? BATTLE_SUBMIT_LABEL : settings.ctaLabel || 'Join My Box Battle'
  const paypalEmail = settings.paypalEmail || ''
  const siteName = settings.siteName || ''

  if (pathname !== '/' && pathname !== '/how-to-join' && pathname !== '/battle-schedule' && pathname !== '/daily-quotes') {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3"
      style={{ background: 'rgba(42,20,80,0.96)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,138,61,0.35)' }}
    >
      <div className="flex gap-2">
        <button
          onClick={isSpecialPage ? openSpecial : openOfficial}
          className="btn-shimmer flex-1 py-3 text-center text-white font-bold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 4px 20px rgba(255,107,26,0.4)' }}
        >
          {label}
        </button>
        <form action="https://www.paypal.com/donate" method="post" target="_blank" className="flex-1" onSubmit={(e) => { if (!paypalEmail) { e.preventDefault(); alert('Donations coming soon — the admin will configure PayPal in Settings.'); } }}>
            <input type="hidden" name="business" value={paypalEmail} />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value={`${siteName} Donation`} />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="hidden" name="amount" value="" />
            <button
              type="submit"
              className="w-full py-3 text-center text-white font-bold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #0070BA, #005ea6)', boxShadow: '0 4px 20px rgba(0,112,186,0.3)' }}
            >
              <span className="w-4 h-4 block">{Icons.heart}</span>
              Donate
            </button>
          </form>
      </div>
    </div>
  )
}
