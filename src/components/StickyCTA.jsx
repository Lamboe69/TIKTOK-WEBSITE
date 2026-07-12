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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-white/95 backdrop-blur-sm border-t border-brand-200">
      <button
        onClick={isSpecialPage ? openSpecial : openOfficial}
        className="block w-full py-2.5 text-center bg-brand-900 text-white font-semibold rounded-lg text-sm hover:bg-brand-800 transition-colors"
      >
        {label}
      </button>
    </div>
  )
}
