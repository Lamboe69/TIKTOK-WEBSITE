import { useLocation } from 'react-router-dom'
import { useSignUp } from './SignUpContext'
import { useContent } from '../cms/ContentContext'

export default function StickyCTA() {
  const { pathname } = useLocation()
  const { openOfficial, openSpecial } = useSignUp()
  const { settings } = useContent()

  const isSpecialPage = pathname === '/daily-quotes'
  const label = isSpecialPage ? 'Fill Form Here' : settings.ctaLabel || 'Join My Box Battle'

  if (pathname !== '/' && pathname !== '/how-to-join' && pathname !== '/battle-schedule' && pathname !== '/daily-quotes') {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3"
      style={{ background: 'rgba(42,20,80,0.96)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,138,61,0.35)' }}
    >
      <button
        onClick={isSpecialPage ? openSpecial : openOfficial}
        className="block w-full py-3 text-center text-white font-bold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
      >
        {label}
      </button>
    </div>
  )
}
