import dayjs, { type Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import { DATE_MESSAGES } from "../../constants/dateMessages";
import type { DateRange, FetchPayload } from "../../data/types";
import {
  daysDiff,
  formatForPayload,
  isFutureDate,
  isPastRestricted,
} from "../utils/dateUtils";

const DEFAULT_TIMEZONE = "Asia/Singapore";

interface UseDateRangePickerParams {
  pastDayLimit?: number;
  rangeLimit: number;
}

const buildDefaultRange = (now: () => Dayjs): DateRange => {
  return {
    startDate: now().subtract(6, "day").startOf("day"),
    endDate: now().startOf("day"),
  };
};

const useDateRangePicker = ({ pastDayLimit, rangeLimit }: UseDateRangePickerParams) => {
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const now = useCallback(() => dayjs.tz(undefined, timezone), [timezone]);

  const [activeMonth, setActiveMonth] = useState<Dayjs>(() =>
    now().startOf("month"),
  );
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    buildDefaultRange(now),
  );
  const [confirmedRange, setConfirmedRange] = useState<DateRange>(
    buildDefaultRange(now),
  );
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);

  const goToPrevMonth = useCallback(() => {
    setActiveMonth((prev) => prev.subtract(1, "month"));
  }, []);

  const goToNextMonth = useCallback(() => {
    if (activeMonth.isSame(now(), "month")) return;
    setActiveMonth((prev) => prev.add(1, "month"));
  }, [activeMonth, now]);

  const handleDateClick = useCallback(
    (date: Dayjs) => {
      if (isPastRestricted(date, pastDayLimit) || isFutureDate(date)) return;
      if (DATE_MESSAGES[date.format("YYYY-MM-DD")]?.disabled) return;

      if (!isSelecting) {
        setSelectedRange({ startDate: date, endDate: null });
        setIsSelecting(true);
        return;
      }

      // Second click — determine ordered start/end
      const start = selectedRange.startDate!;
      const [rangeStart, rangeEnd] = date.isBefore(start, "day")
        ? [date, start]
        : [start, date];

      if (daysDiff(rangeStart, rangeEnd) > rangeLimit) return;

      setSelectedRange({ startDate: rangeStart, endDate: rangeEnd });
      setIsSelecting(false);
      setHoverDate(null);
    },
    [isSelecting, selectedRange.startDate, pastDayLimit, rangeLimit],
  );

  const handleDateHover = useCallback(
    (date: Dayjs) => {
      if (!isSelecting) return;
      setHoverDate(date);
    },
    [isSelecting],
  );

  const resetSelection = useCallback(() => {
    setSelectedRange(confirmedRange);
    setIsSelecting(false);
    setHoverDate(null);
    setActiveInput(null);
  }, [confirmedRange]);

  const confirmSelection = useCallback((): FetchPayload | null => {
    if (!selectedRange.startDate || !selectedRange.endDate) return null;
    setConfirmedRange(selectedRange);
    setIsSelecting(false);
    setHoverDate(null);
    setActiveInput(null);
    return {
      startDate: formatForPayload(selectedRange.startDate, timezone, false),
      endDate: formatForPayload(selectedRange.endDate, timezone, true),
      timezone,
    };
  }, [selectedRange, timezone]);

  return {
    now,
    activeMonth,
    selectedRange,
    hoverDate,
    isSelecting,
    activeInput,
    timezone,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    handleDateHover,
    resetSelection,
    confirmSelection,
    setActiveInput,
    setTimezone,
  };
};

export default useDateRangePicker
