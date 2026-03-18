import { Calendar1 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TIMEZONE_OPTIONS } from "../../../constants/timezones";
import { type DateMessage, type FetchPayload } from '../../../data';
import { useDateRangePicker } from "../../hooks";
import { formatDate, formatRangeDisplay, getGMTOffset } from "../../utils";
import DateRangePickerPanel from "./DateRangePickerPanel";

interface DateRangePickerProps {
  name: string;
  onConfirm?: (payload: FetchPayload) => void;
  pastDayLimit?: number;
  rangeLimit?: number;
  dateConfig?: Record<string, DateMessage>
}

const DEFAULT_RANGE_LIMIT = 10;

const DateRangePicker = ({
  name,
  onConfirm,
  pastDayLimit,
  rangeLimit = DEFAULT_RANGE_LIMIT,
  dateConfig
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useDateRangePicker({ pastDayLimit, rangeLimit });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        resetSelection();
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen, resetSelection]);

  const openWithInput = useCallback(
    (input: "start" | "end") => {
      setActiveInput(input);
      setIsOpen(true);
    },
    [setActiveInput],
  );

  const handleCancel = useCallback(() => {
    resetSelection();
    setIsOpen(false);
  }, [resetSelection]);

  const handleClear = useCallback(() => resetSelection(), [resetSelection]);

  const handleGo = useCallback(() => {
    if (!selectedRange.startDate || !selectedRange.endDate) return;
    const payload = confirmSelection();
    if (payload) onConfirm?.(payload);
    setIsOpen(false);
  }, [selectedRange, confirmSelection, onConfirm]);

  const startLabel =
    (selectedRange.startDate && formatDate(selectedRange.startDate)) ||
    "Start Date";
  const endLabel =
    (selectedRange.endDate && formatDate(selectedRange.endDate)) || "End Date";
  const datePickerLabel = `${startLabel} - ${endLabel} ${getGMTOffset(timezone)}`;

  const rangeDisplayText =
    selectedRange.startDate && selectedRange.endDate
      ? formatRangeDisplay(
          selectedRange.startDate,
          selectedRange.endDate,
          timezone,
        )
      : null;

  return (
    <div ref={containerRef} className="relative inline-flex" id={name}>
      <div className="flex items-center gap-1 border border-gray-300 rounded-lg bg-white px-3 py-2 cursor-pointer hover:border-blue-400 transition-colors">
        <input
          readOnly
          value={datePickerLabel}
          onFocus={() => openWithInput("start")}
          className={`w-[260px] text-sm outline-none cursor-pointer bg-transparent ${activeInput === "start" && isOpen ? "text-blue-500" : "text-gray-700"}`}
          placeholder="Start Date"
        />
        <Calendar1 className="text-gray-400" size={20} />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl px-2">
          <div className="flex justify-center px-5 pt-4">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="text-xs w-[100%] text-gray-600 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-400 bg-white"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <DateRangePickerPanel
              now={now}
              month={activeMonth}
              selectedRange={selectedRange}
              hoverDate={hoverDate}
              isSelecting={isSelecting}
              dateConfig={dateConfig}
              onDateClick={handleDateClick}
              onDateHover={handleDateHover}
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
              pastDayLimit={pastDayLimit}
              rangeLimit={rangeLimit}
            />
          </div>

          {rangeDisplayText && (
            <div className="text-center text-sm text-gray-500 pb-2 px-4">
              {rangeDisplayText}
            </div>
          )}

          <div className="flex items-right justify-between px-4 py-3 border-t border-gray-100">
            <div>
              <button
                onClick={handleClear}
                className="py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
            <div className="flex w-full justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-1.5 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGo}
                disabled={
                  !selectedRange.startDate ||
                  !selectedRange.endDate ||
                  isSelecting
                }
                className="px-4 py-1.5 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
