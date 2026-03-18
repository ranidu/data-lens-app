import type { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from '../../utils';

interface CalendarHeaderProps {
  now: () => Dayjs
  month: Dayjs
  onPrev: () => void
  onNext: () => void
}

const DATE_FORMAT = 'MMMM YYYY'

const DateRangePickerHeader = ({ now, month, onPrev, onNext }: CalendarHeaderProps) => {
  const isActiveMonth = month.isSame(now(), "month")
  return (
    <div className="flex items-center justify-between px-1 py-1">
      <button
        onClick={onPrev}
        className={`p-1 rounded hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer`}
        aria-label="Previous month"
      >
        <ChevronLeft />
      </button>

      <span className="text-sm font-semibold text-gray-800 select-none">
        {formatDate(month, DATE_FORMAT)}
      </span>

      <button
        onClick={onNext}
        className={`p-1 rounded hover:bg-gray-100 text-gray-600 transition-colors`}
        aria-label="Next month"
        disabled={isActiveMonth}
      >
        <ChevronRight className={isActiveMonth ? 'text-gray-300' : ''}/>
      </button>
    </div>
  );
}

export default DateRangePickerHeader
