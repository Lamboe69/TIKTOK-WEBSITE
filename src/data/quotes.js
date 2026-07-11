export const quotes = [
  {
    day: 'Monday',
    short: 'Mon',
    quote: 'New week, same dynasty. Tap with purpose, pray with heart \u2013 Godsent sees every effort.',
    emoji: '\uD83D\uDE4F\uD83D\uDCF1',
  },
  {
    day: 'Tuesday',
    short: 'Tue',
    quote: "You don't need the biggest box to be a king. Just show up, support, and stay kind.",
    emoji: '\uD83D\uDC51\uD83D\uDC96',
  },
  {
    day: 'Wednesday',
    short: 'Wed',
    quote: '5000 taps is a promise \u2013 to yourself, to the family, to the battle ahead.',
    emoji: '\uD83D\uDCC8\u26A1',
  },
  {
    day: 'Thursday',
    short: 'Thu',
    quote: "Helping the host win co-host battles? That's not teamwork. That's KM blood.",
    emoji: '\uD83E\uDE78\uD83E\uDD1D',
  },
  {
    day: 'Friday',
    short: 'Fri',
    quote: "Top seven isn't a rank. It's a mindset \u2013 lift others as you rise.",
    emoji: '\uD83D\uDD1D\u2728',
  },
  {
    day: 'Saturday',
    short: 'Sat',
    quote: 'Daily win leads to Sunday. Sunday win leads to Champions. Champions lead with love.',
    emoji: '\uD83C\uDFC6\u2764\uFE0F',
  },
  {
    day: 'Sunday',
    short: 'Sun',
    quote: 'Rest if you must, but never quit. The dynasty keeps going because YOU keep going.',
    emoji: '\uD83D\uDECC\u27A1\uFE0F\uD83D\uDD25',
  },
]

export const getTodayQuote = () => {
  const dayIndex = new Date().getDay()
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
  return quotes[adjustedIndex]
}
