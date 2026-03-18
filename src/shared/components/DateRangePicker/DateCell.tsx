import type { Dayjs } from "dayjs";
import { memo } from "react";
import type { DateMessage } from "../../../data/types";

interface DateCellProps {
  date: Dayjs;
  currentMonth: Dayjs;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  isHoverRange: boolean;
  isHoverRangeExceeded: boolean;
  isToday: boolean;
  isDisabled: boolean;
  message: DateMessage | null;
  onClick: (date: Dayjs) => void;
  onMouseEnter: (date: Dayjs) => void;
}

const DateCell = ({
  date,
  currentMonth,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isHoverRange,
  isHoverRangeExceeded,
  isToday,
  isDisabled,
  message,
  onClick,
  onMouseEnter,
}: DateCellProps) => {
  const isOutsideMonth = !date.isSame(currentMonth, "month");
  const isSelected = isRangeStart || isRangeEnd;

  const bandClass = [
    "relative flex items-center justify-center h-8 w-full",
    isRangeStart ? "rounded-l-full" : "",
    isRangeEnd ? "rounded-r-full" : "",
    isInRange || isHoverRange ? "bg-blue-100" : "",
    isHoverRangeExceeded ? "bg-red-50" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const circleClass = [
    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm select-none",
    isDisabled
      ? "opacity-30 cursor-not-allowed pointer-events-none"
      : "cursor-pointer",
    isSelected ? "bg-blue-500 text-white font-semibold" : "",
    !isSelected && isToday ? "font-bold ring-1 ring-blue-400" : "",
    !isSelected && isOutsideMonth ? "text-gray-300" : "",
    !isSelected && !isOutsideMonth && !isDisabled ? "hover:bg-gray-100" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showTooltip = !!message || isHoverRangeExceeded;

  return (
    <div className={bandClass}>
      <div
        className="group relative"
        onClick={() => !isDisabled && onClick(date)}
        onMouseEnter={() => onMouseEnter(date)}
      >
        <div className={circleClass}>
          {date.date()}
          {message && (
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
          )}
        </div>

        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-50 whitespace-nowrap pointer-events-none">
            <div className="bg-gray-800 text-white text-xs rounded px-2 py-1">
              {isHoverRangeExceeded ? "Max 10 days" : message?.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DateCell);
