export default function PayPalDonate({ variant = 'compact' }) {
  const paypalEmail = 'YOUR_PAYPAL_EMAIL'

  const form = (
    <form action="https://www.paypal.com/donate" method="post" target="_blank">
      <input type="hidden" name="business" value={paypalEmail} />
      <input type="hidden" name="no_recurring" value="0" />
      <input type="hidden" name="item_name" value="KM DYNASTY Donation" />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="amount" value="" />
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-sm rounded-xl transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
        </svg>
        Donate with PayPal
      </button>
    </form>
  )

  if (variant === 'full') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-dynasty-purple/10 flex items-center justify-center mx-auto mb-4">
          <span className="w-7 h-7 text-dynasty-purple block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-dynasty-charcoal mb-2">
          Back the Dynasty
        </h3>
        <p className="text-sm text-gray-500 mb-2 max-w-xs mx-auto">
          Every dollar fuels the family — bigger prizes, charity events, and a stronger community.
        </p>
        <p className="text-[11px] text-gray-400 mb-6">
          Secure payment via PayPal. Any amount makes a difference.
        </p>
        {form}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
      <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">
        Support KM DYNASTY
      </h3>
      <p className="text-xs text-gray-500 mb-5 max-w-sm mx-auto">
        Your donations help keep the dynasty running — better battles, bigger prizes, stronger community.
      </p>
      {form}
    </div>
  )
}
