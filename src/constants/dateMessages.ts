import type { DateMessage } from '../data/types'

export const DATE_MESSAGES: Record<string, DateMessage> = {
  '2026-03-10': { message: 'System maintenance', disabled: true },
  '2026-03-13': { message: 'Partial data only', disabled: false },
  '2026-03-15': { message: 'High traffic period', disabled: false },
  '2026-03-16': { message: 'Data processing delay', disabled: false },
  '2026-03-17': { message: 'Today — live data', disabled: false },
}
