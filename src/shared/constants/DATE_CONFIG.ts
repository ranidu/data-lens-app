import type { DateMessage } from '../../data'

export const DATE_CONFIG: Record<string, DateMessage> = {
  '2026-01-01': { message: "New Year's Day", disabled: true },
  '2026-02-17': { message: 'Chinese New Year', disabled: true },
  '2026-02-18': { message: 'Chinese New Year', disabled: true },
  '2026-03-12': { message: 'World Kidney Day', disabled: false },
  '2026-03-13': { message: 'Friday the 13th', disabled: false },
  '2026-03-21': { message: 'Hari Raya Puasa', disabled: true },
  '2026-03-28': { message: 'World Earth Day', disabled: true },
  '2026-03-31': { message: 'Month End', disabled: false },
  '2026-04-15': { message: 'World Art Day', disabled: false },
}
