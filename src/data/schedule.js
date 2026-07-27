import { toDateKey } from '../utils/scheduleDisplay'

export const battleTypes = ['All', 'Daily Godsent', 'Scavengers', 'Most Beautiful', 'Country', 'Champion of Champions']

const SCHEDULE_TEMPLATE = [
  {
    id: 1,
    title: 'Daily Godsent Box Battle',
    type: 'Daily Godsent',
    offset: 0,
    time: '8:00 PM CT',
    description: 'The daily grind. Bring your taps, prayers, and energy.',
  },
  {
    id: 2,
    title: 'Daily Godsent Box Battle',
    type: 'Daily Godsent',
    offset: 1,
    time: '8:00 PM CT',
    description: 'Midweek momentum — show up ready for the crown.',
  },
  {
    id: 3,
    title: 'Most Beautiful Box Battle',
    type: 'Most Beautiful',
    offset: 2,
    time: '7:00 PM CT',
    description: 'Beauty meets battle. Show your sparkle in the box.',
  },
  {
    id: 6,
    title: 'Daily Godsent Box Battle',
    type: 'Daily Godsent',
    offset: 3,
    time: '8:00 PM CT',
    description: 'Midweek battle. Keep the momentum alive.',
  },
  {
    id: 4,
    title: 'Country Box Battle',
    type: 'Country',
    offset: 4,
    time: '7:30 PM CT',
    description: 'Rep your nation. Country pride in the box battle arena.',
  },
  {
    id: 7,
    title: 'Scavengers Box Battle',
    type: 'Scavengers',
    offset: 5,
    time: '7:00 PM CT',
    description: 'Scavengers edition. For those who hunt for the win.',
  },
  {
    id: 8,
    title: 'Daily Godsent Box Battle',
    type: 'Daily Godsent',
    offset: 6,
    time: '8:00 PM CT',
    description: 'Friday night battle. End the week strong.',
  },
  {
    id: 5,
    title: 'Champion of Champions',
    type: 'Champion of Champions',
    offset: 7,
    time: '9:00 PM CT',
    description: 'Winners from ALL Official Godsent Battles compete in the grand Dynasty finale.',
  },
]

function buildScheduleFromToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return SCHEDULE_TEMPLATE.map(({ offset, ...item }) => {
    const d = new Date(today)
    d.setDate(today.getDate() + offset)
    return { ...item, date: toDateKey(d) }
  })
}

/** Fallback battles anchored to today + next days */
export const schedule = buildScheduleFromToday()

export function getDefaultSchedule() {
  return buildScheduleFromToday()
}
