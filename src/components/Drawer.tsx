import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import type { TableRow } from '../data'
import { getUsers, type FetchPayload, type GetUsersPayload } from '../data'
import { DateRangePicker, Table } from '../shared/components'
import { COLUMN_DEF, DATE_CONFIG } from '../shared/constants'
import { formatForPayload } from '../shared/utils'

const DEFAULT_TIMEZONE = 'Asia/Singapore'
const DEFAULT_DAYS = 6

const Drawer = () => {
  const [rows, setRows] = useState<TableRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async (payload: GetUsersPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getUsers(payload)
      setRows(result)
    } catch {
      setError('Failed to load data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const now = dayjs.tz(undefined, DEFAULT_TIMEZONE)
    fetchUsers({
      startDate: formatForPayload(
        now.subtract(DEFAULT_DAYS, 'day').startOf('day'),
        DEFAULT_TIMEZONE,
        false,
      ),
      endDate: formatForPayload(now.startOf('day'), DEFAULT_TIMEZONE, true),
    })
  }, [fetchUsers])

  const handleConfirm = useCallback(
    (payload: FetchPayload) => {
      fetchUsers({ startDate: payload.startDate, endDate: payload.endDate })
    },
    [fetchUsers],
  )

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="border border-gray-300 p-4 rounded-lg">
        <DateRangePicker
          name="dateRangePicker"
          pastDayLimit={30}
          rangeLimit={10}
          onConfirm={handleConfirm}
          dateConfig={DATE_CONFIG}
        />
      </div>
      <div className="border border-gray-300 rounded-lg shadow-xs">
        <Table
          columnDefs={COLUMN_DEF}
          rows={rows as unknown as Record<string, unknown>[]}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default Drawer
