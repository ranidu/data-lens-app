import type { DateMessage } from '../data/types'

export const DATE_CONFIG: Record<string, DateMessage> = {
  '2026-03-10': { message: 'Chinese New Year', disabled: true },
  '2026-03-13': { message: 'National Holiday', disabled: false },
  '2026-03-15': { message: 'Good Friday', disabled: false },
  '2026-03-16': { message: 'Labour Day', disabled: false },
  '2026-03-21': { message: 'Hari Raya Puasa', disabled: false },
}
