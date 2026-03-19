import { ChevronDown, ChevronsUpDown, ChevronUp, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ColumnDef {
  headerName: string;
  field: string;
  styles?: Record<string, string>;
  className?: string;
  filter?: boolean;
  sort?: boolean;
}

interface TableProps {
  columnDefs: ColumnDef[];
  rows: Record<string, unknown>[];
  isLoading?: boolean;
  error?: string | null;
}

interface SortEntry {
  field: string;
  direction: "asc" | "desc";
}

const Table = ({ columnDefs, rows, isLoading, error }: TableProps) => {
  const [sortStates, setSortStates] = useState<SortEntry>();
  const [openSearch, setOpenSearch] = useState<string | null>(null);
  const [searchInputs, setSearchInputs] = useState<Record<string, string>>({});
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>(
    {},
  );

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
        setOpenSearch(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (field: string) => {
    setSortStates((prev) => {
      if (prev?.field !== field) return { field, direction: "asc" };
      if (prev.direction === "asc") return { ...prev, direction: "desc" };
      return;
    });
  };

  const handleSearch = (field: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: searchInputs[field] ?? "",
    }));
    setOpenSearch(null);
  };

  const handleResetFilter = (field: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: "",
    }));
    setSearchInputs({});
  };

  let displayRows = rows.filter((row) =>
    Object.entries(searchFilters).every(([field, value]) => {
      if (!value) return true;
      return String(row[field] ?? "")
        .toLowerCase()
        .includes(value.toLowerCase());
    }),
  );

  if (sortStates) {
    displayRows = [...displayRows].sort((a, b) => {
      const aValue = String(a[sortStates.field] ?? "");
      const bValue = String(b[sortStates.field] ?? "");
      const compare = aValue.localeCompare(bValue, undefined, { numeric: true });
      return sortStates.direction === "asc" ? compare : -compare;
    });
  }

  return (
    <div ref={tableRef} className="overflow-auto">
      <table className="w-full border-collapse min-h-[100px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columnDefs.map((col) => {
              const sortEntry = sortStates?.field === col.field;
              const isSearchOpen = openSearch === col.field;

              return (
                <th
                  key={col.field}
                  className={`relative px-4 py-3 text-left text-sm font-semibold text-gray-700 ${col.className ?? ""}`}
                  style={col.styles}
                >
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSort(col.field)}
                      className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>{col.headerName}</span>
                      {!sortEntry && col.sort && (
                        <ChevronsUpDown size={14} className="text-gray-400" />
                      )}
                      {sortEntry && sortStates?.direction === "asc" && (
                        <ChevronUp size={14} className="text-blue-500" />
                      )}
                      {sortEntry && sortStates?.direction === "desc" && (
                        <ChevronDown size={14} className="text-blue-500" />
                      )}
                    </button>
                    {col.filter && (
                      <button
                        onClick={() =>
                          setOpenSearch(isSearchOpen ? null : col.field)
                        }
                        className={`ml-1 transition-colors cursor-pointer ${
                          searchFilters[col.field]
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                        }`}
                      >
                        <Search size={14} />
                      </button>
                    )}
                  </div>

                  {isSearchOpen && (
                    <div className="absolute top-full left-0 z-10 mt-1 bg-white border border-gray-200 rounded shadow-md p-2 flex gap-1 min-w-40">
                      <input
                        autoFocus
                        type="text"
                        value={searchInputs[col.field] ?? ""}
                        onChange={(e) =>
                          setSearchInputs((prev) => ({
                            ...prev,
                            [col.field]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSearch(col.field)
                        }
                        placeholder={`Search ${col.headerName}...`}
                        className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                      />
                      <div className="flex flex-row gap-2">
                        <button
                          onClick={() => handleSearch(col.field)}
                          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          Search
                        </button>
                        <button
                          onClick={() => handleResetFilter(col.field)}
                          className="cursor-pointer hover:bg-gray-100 text-xs px-2 py-1 rounded"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columnDefs.length} className="px-4 py-8 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                  Loading…
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={columnDefs.length}
                className="px-4 py-8 text-center text-sm text-red-500"
              >
                {error}
              </td>
            </tr>
          ) : displayRows.length === 0 ? (
            <tr>
              <td
                colSpan={columnDefs.length}
                className="px-4 py-8 text-center text-sm text-gray-400"
              >
                No results found
              </td>
            </tr>
          ) : (
            displayRows.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                {columnDefs.map((col) => (
                  <td
                    key={col.field}
                    className="px-4 py-3 text-sm text-gray-600"
                  >
                    {String(row[col.field] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
