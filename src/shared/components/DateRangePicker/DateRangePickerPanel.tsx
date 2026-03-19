import type { Dayjs } from "dayjs";
import type { DateMessage, DateRange } from "../../../data";
import DateRangePickerGrid from "./DateRangePickerGrid";
import DateRangePickerHeader from "./DateRangePickerHeader";

interface CalendarPanelProps {
  now: () => Dayjs;
  month: Dayjs;
  selectedRange: DateRange;
  hoverDate: Dayjs | null;
  isSelecting: boolean;
  dateConfig?: Record<string, DateMessage>;
  onDateClick: (date: Dayjs) => void;
  onDateHover: (date: Dayjs) => void;
  onPrev: () => void;
  onNext: () => void;
  pastDayLimit?: number;
  rangeLimit?: number;
}

const DateRangePickerPanel = ({
  now,
  month,
  selectedRange,
  hoverDate,
  isSelecting,
  dateConfig,
  onDateClick,
  onDateHover,
  onPrev,
  onNext,
  pastDayLimit,
  rangeLimit,
}: CalendarPanelProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 w-[290px]">
      <DateRangePickerHeader
        now={now}
        month={month}
        onPrev={onPrev}
        onNext={onNext}
      />
      <DateRangePickerGrid
        month={month}
        selectedRange={selectedRange}
        hoverDate={hoverDate}
        isSelecting={isSelecting}
        dateConfig={dateConfig}
        onDateClick={onDateClick}
        onDateHover={onDateHover}
        pastDayLimit={pastDayLimit}
        rangeLimit={rangeLimit}
      />
    </div>
  );
}

export default DateRangePickerPanel
