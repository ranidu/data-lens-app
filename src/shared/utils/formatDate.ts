import { Dayjs, isDayjs } from "dayjs";

const DATE_FORMAT = "DD MMM YYYY";

const formatDate = (date: Dayjs, format?: string): string | null => {
  if (!isDayjs(date)) return null;
  return date.format(format ?? DATE_FORMAT);
};

export default formatDate;
