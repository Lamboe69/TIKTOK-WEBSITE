const tiers = [
  {
    name: '1-on-1 Consultation',
    price: '$300',
    originalPrice: '$500',
    badge: null,
    duration: 'Private Session · 1 Hour',
    features: [
      '1 hour private Zoom session',
      'Personal or business consultation',
      'Deep profile/livestream analysis',
      'Strategies to fix & improve performance',
      'Bonus: Livestream guest appearance',
      'Dynasty Community introduction',
    ],
    cta: 'Book Now',
  },
  {
    name: 'Dynasty Masterclass',
    price: '$500',
    originalPrice: '$750',
    badge: 'Popular',
    duration: '5 Weeks Program',
    features: [
      '5 live weekly Zoom sessions',
      '5 weeks of monetisation & growth training',
      'Community-building frameworks',
      'Real-time problem solving',
      'Full training slides included',
      'Dynasty badge of completion',
    ],
    cta: 'Enrol Now',
  },
  {
    name: 'Masterclass + Mentorship',
    price: '$1,200',
    originalPrice: '$1,500',
    badge: 'Premium',
    duration: '5 Weeks + Ongoing Mentorship',
    features: [
      'Everything in the Masterclass',
      'Ongoing personal mentorship from King Maker',
      'Priority 1-on-1 direct access',
      'Flexible timing',
      'Post-program follow-up',
      'Personal growth systems',
      'Lifetime Dynasty inner circle access',
    ],
    cta: 'Enrol Now',
  },
]

const schedule = {
  day: 'Every Saturday',
  time: '2:00 PM CT (Dallas Time)',
  format: 'Live Zoom sessions (1 hour each) with full training slides',
}

const terms = [
  'Same-day bookings must be made before 2:00 PM CT.',
  'Sessions run Saturdays only.',
  'No access to sessions after program completion.',
  'All programmes are subject to availability.',
]

export { tiers, schedule, terms }
