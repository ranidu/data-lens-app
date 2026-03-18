export const TIMEZONE_TO_OFFSET: Record<string, string> = {
  'Asia/Singapore':    '+0800',
  'Asia/Kolkata':      '+0530',
  'Asia/Dubai':        '+0400',
  'Europe/Moscow':     '+0300',
  'Europe/London':     '+0000',
  'America/New_York':  '-0500',
  'America/Los_Angeles': '-0800',
}

const TIMEZONE_TO_GMT_LABEL: Record<string, string> = {
  'Asia/Singapore':    'GMT+8',
  'Asia/Kolkata':      'GMT+5:30',
  'Asia/Dubai':        'GMT+4',
  'Europe/Moscow':     'GMT+3',
  'Europe/London':     'GMT+0',
  'America/New_York':  'GMT-5',
  'America/Los_Angeles': 'GMT-8',
}

export function getGMTOffset(timezone: string): string {
  return TIMEZONE_TO_GMT_LABEL[timezone] ?? 'GMT+0'
}
