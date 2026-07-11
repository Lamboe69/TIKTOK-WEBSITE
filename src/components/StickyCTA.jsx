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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/95 backdrop-blur-md border-t border-dynasty-cream">
      <button
        onClick={isSpecialPage ? openSpecial : openOfficial}
        className="block w-full py-3 text-center bg-dynasty-orange text-white font-bold rounded-xl text-sm hover:bg-dynasty-orange-dark transition-colors shadow-lg"
      >
        {label}
      </button>
    </div>
  )
}
