# Data Lens App

A React application with a date range picker and data table for exploring user data.

---

## 1. Setting Up the Project

**Prerequisites:** Node.js 18+

```bash
npm install
```

---

## 2. Running the Project

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

---

## 3. Components

### DateRangePicker

A calendar-based date range selector with timezone support.

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Unique identifier for the picker |
| `onConfirm` | `(payload: FetchPayload) => void` | Callback fired when "Go" is clicked |
| `pastDayLimit` | `number` | Max number of past days selectable from today |
| `rangeLimit` | `number` | Max number of days allowed in a selection range |
| `dateConfig` | `Record<string, DateMessage>` | Map of dates to custom messages (e.g. holidays, annotations) |

**Features**
- Select a start and end date by clicking
- Hover preview of range
- Timezone selector (dropdown)
- `pastDayLimit` — prevents selecting dates beyond N days in the past
- `rangeLimit` — caps the max span of a selected range
- `dateConfig` — annotates specific dates with custom labels (e.g. public holidays)
- Reset, Cancel, and Go actions

**Example**
```tsx
<DateRangePicker
  name="dateRangePicker"
  pastDayLimit={30}
  rangeLimit={10}
  onConfirm={handleConfirm}
  dateConfig={{
    "2025-01-01": { message: "New Year's Day", type: "holiday" }
  }}
/>
```

---

### Table

A data table with per-column sorting and filtering.

**Props**

| Prop | Type | Description |
|------|------|-------------|
| `columnDefs` | `ColumnDef[]` | Column configuration |
| `rows` | `Record<string, unknown>[]` | Row data |
| `isLoading` | `boolean` | Shows loading spinner |
| `error` | `string \| null` | Displays error message |

**ColumnDef fields**

| Field | Type | Description |
|-------|------|-------------|
| `headerName` | `string` | Column header label |
| `field` | `string` | Key to read from row data |
| `sort` | `boolean` | Enable ascending/descending sort |
| `filter` | `boolean` | Enable search filter for the column |
| `styles` | `object` | Inline styles for the header cell |
| `className` | `string` | CSS class for the header cell |

**Features**
- Per-column sorting (asc → desc → off)
- Per-column search filter with Enter key support
- Loading state with spinner
- Error state display
- Empty state display

**Example**
```tsx
<Table
  columnDefs={[
    { headerName: "Name", field: "name", sort: true, filter: true },
    { headerName: "Email", field: "email", filter: true },
  ]}
  rows={rows}
  isLoading={isLoading}
  error={error}
/>
```
