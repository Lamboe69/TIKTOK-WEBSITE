import { useLocation } from 'react-router-dom'
import { useSignUp } from './SignUpContext'

export default function StickyCTA() {
  const { pathname } = useLocation()
  const { openOfficial, openSpecial } = useSignUp()

  const isSpecialPage = pathname === '/daily-quotes'
  const label = isSpecialPage ? 'Fill Form Here' : 'Sign Up — Box Battle'

  if (pathname !== '/' && pathname !== '/how-to-join' && pathname !== '/battle-schedule' && pathname !== '/daily-quotes') {
    return null
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3"
      style={{ background: 'rgba(18,6,32,0.95)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        onClick={isSpecialPage ? openSpecial : openOfficial}
        className="btn-shimmer block w-full py-3 text-center text-white font-bold rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-95"
        style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 4px 20px rgba(255,107,26,0.4)' }}
      >
        {label}
      </button>
    </div>
  )
}
