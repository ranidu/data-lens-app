import dayjs, { type Dayjs } from 'dayjs'
import formatDate from './formatDate'
import { getGMTOffset, TIMEZONE_TO_OFFSET } from './timezoneUtils'

const DEFAULT_PAST_DAY_LIMIT = 90

export function formatRangeDisplay(start: Dayjs, end: Dayjs, timezone: string): string {
  const startStr = formatDate(start)
  const endStr = formatDate(end)
  const offset = getGMTOffset(timezone)
  return `${startStr} - ${endStr} ${offset}`
}

export function formatForPayload(date: Dayjs, timezone: string, isEndOfDay: boolean): string {
  const dateStr = date.format('YYYY-MM-DD')
  const timeStr = isEndOfDay ? '23:59:59' : '00:00:00'
  const offset = TIMEZONE_TO_OFFSET[timezone] ?? '+0000'
  // Format offset as "+03:00" style → already stored as "+0300", convert to "+03:00"
  const offsetFormatted = offset.replace(/([+-]\d{2})(\d{2})/, '$1:$2')
  return `${dateStr} ${timeStr} ${offsetFormatted}`
}

export function isPastRestricted(date: Dayjs, pastDayLimit: number = DEFAULT_PAST_DAY_LIMIT): boolean {
  return dayjs().diff(date, 'day') > pastDayLimit
}

export function isFutureDate(date: Dayjs): boolean {
  return date.isAfter(dayjs(), 'day')
}

export function getCalendarDays(month: Dayjs): Dayjs[] {
  const firstDay = month.startOf('month')
  const startDayOfWeek = firstDay.day() // 0 = Sunday
  const startCell = firstDay.subtract(startDayOfWeek, 'day')
  return Array.from({ length: 42 }, (_, i) => startCell.add(i, 'day'))
}

export function isInRange(date: Dayjs, start: Dayjs | null, end: Dayjs | null): boolean {
  if (!start || !end) return false
  return date.isAfter(start, 'day') && date.isBefore(end, 'day')
}

export function daysDiff(start: Dayjs, end: Dayjs): number {
  return Math.abs(end.diff(start, 'day'))
}
