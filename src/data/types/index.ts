import type { Dayjs } from 'dayjs'

export interface DateRange {
  startDate: Dayjs | null
  endDate: Dayjs | null
}

export interface TimezoneOption {
  label: string
  value: string
}

export interface DateMessage {
  message: string
  disabled: boolean
}

export interface TableRow {
  id: string
  name: string
  date: string
  amount: number
  status: 'Active' | 'Pending' | 'Inactive' | 'Flagged'
}

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
  column: keyof TableRow | null
  direction: SortDirection
}

export interface FetchPayload {
  startDate: string  // "2024-12-10 00:00:00 +0300"
  endDate: string    // "2024-12-20 23:59:59 +0300"
  timezone: string   // "Europe/Moscow"
}
