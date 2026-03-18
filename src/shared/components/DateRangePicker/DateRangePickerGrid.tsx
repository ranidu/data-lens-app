import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useMemo } from 'react'
import type { DateMessage, DateRange } from '../../../data/types'
import { daysDiff, formatDate, getCalendarDays, isInRange, isPastRestricted } from '../../utils'
import DateCell from './DateCell'

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface CalendarGridProps {
  month: Dayjs
  selectedRange: DateRange
  hoverDate: Dayjs | null
  isSelecting: boolean
  dateConfig?: Record<string, DateMessage>
  onDateClick: (date: Dayjs) => void
  onDateHover: (date: Dayjs) => void
  pastDayLimit?: number
  rangeLimit: number
}

const DateRangePickerGrid = ({
  month,
  selectedRange,
  hoverDate,
  isSelecting,
  dateConfig,
  onDateClick,
  onDateHover,
  pastDayLimit,
  rangeLimit
}: CalendarGridProps) => {
  const days = useMemo(() => getCalendarDays(month), [month])

  const cellProps = useMemo(() => {
    const { startDate, endDate } = selectedRange
    const today = dayjs().startOf('day')

    let rangeStart = startDate
    let rangeEnd = isSelecting && hoverDate ? hoverDate : endDate

    if (rangeStart && rangeEnd && rangeEnd.isBefore(rangeStart, 'day')) {
      [rangeStart, rangeEnd] = [rangeEnd, rangeStart]
    }

    const isRangeExceed =
      isSelecting &&
      hoverDate !== null &&
      startDate !== null &&
      daysDiff(startDate, hoverDate) > rangeLimit

    return days.map(date => {
      const dateKey = formatDate(date, 'YYYY-MM-DD') as string

      const message = dateConfig?.[dateKey] ?? null
      const isRangeStart = !!(startDate && date.isSame(startDate, 'day'))
      const isRangeEnd = !!(rangeEnd && date.isSame(rangeEnd, 'day') && !isSelecting)
      const inRange = isInRange(date, rangeStart, rangeEnd)
      const inHoverRange = isSelecting && isInRange(date, rangeStart, rangeEnd)
      const inExceededRange =
        isRangeExceed &&
        startDate !== null &&
        hoverDate !== null &&
        isInRange(date, startDate.isBefore(hoverDate) ? startDate : hoverDate,
                        startDate.isBefore(hoverDate) ? hoverDate : startDate)

      return {
        date,
        isRangeStart,
        isRangeEnd: isRangeEnd && !isSelecting,
        isInRange: !isSelecting && inRange,
        isHoverRange: isSelecting && !isRangeExceed && (inHoverRange || isRangeStart),
        isHoverRangeExceeded: inExceededRange,
        isToday: date.isSame(today, 'day'),
        isDisabled: !!(message?.disabled) || isPastRestricted(date, pastDayLimit),
        message,
      }
    })
  }, [days, selectedRange, hoverDate, isSelecting, dateConfig, pastDayLimit, rangeLimit])

  const handleClick = useCallback((date: Dayjs) => onDateClick(date), [onDateClick])
  const handleHover = useCallback((date: Dayjs) => onDateHover(date), [onDateHover])

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(label => (
          <div key={label} className="flex items-center justify-center h-8 text-xs font-medium text-gray-400 select-none">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cellProps.map((props, i) => (
          <DateCell
            key={i}
            currentMonth={month}
            onClick={handleClick}
            onMouseEnter={handleHover}
            {...props}
          />
        ))}
      </div>
    </div>
  )
}

export default DateRangePickerGrid
