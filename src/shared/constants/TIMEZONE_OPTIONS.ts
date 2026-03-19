import type { TimezoneOption } from '../../data'

const ASIA_SINGAPORE = 'Asia/Singapore'
const ASIA_COLOMBO = 'Asia/Colombo'
const ASIA_DUBAI = 'Asia/Dubai'
const EUROPE_MOSCOW = 'Europe/Moscow'
const EUROPE_LONDON = 'Europe/London'
const AMERICA_NEW_YORK = 'America/New_York'
const AMERICA_LOS_ANGELES = 'America/Los_Angeles'

export const TIMEZONES = {
  ASIA_SINGAPORE,
  ASIA_COLOMBO,
  ASIA_DUBAI,
  EUROPE_MOSCOW,
  EUROPE_LONDON,
  AMERICA_NEW_YORK,
  AMERICA_LOS_ANGELES,
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { label: 'Singapore (GMT+8)', value: ASIA_SINGAPORE },
  { label: 'Sri Lanka (GMT+5:30)', value: ASIA_COLOMBO },
  { label: 'Dubai (GMT+4)', value: ASIA_DUBAI },
  { label: 'Moscow (GMT+3)', value: EUROPE_MOSCOW },
  { label: 'London (GMT+0)', value: EUROPE_LONDON },
  { label: 'New York (GMT-5)', value: AMERICA_NEW_YORK },
  { label: 'Los Angeles (GMT-8)', value: AMERICA_LOS_ANGELES },
]
