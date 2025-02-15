'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  Row,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TextFilter, MultiSelectFilter, DateRangeFilter, RangeFilter } from './table/filters'
import { Equipment, DEPARTMENTS, STATUSES } from '@/types/equipment'
import { equipmentColumns } from './table/columns'
import { MAINTENANCE_TYPES, PRIORITIES, COMPLETION_STATUSES } from '@/types/maintenance'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
}

const getStatusColor = (row: Row<Equipment>) => {
  const status = row.getValue('status')
  if (!status) {
    return '';
  }

  switch (status.toString().toLowerCase()) {
    case 'operational':
      return 'bg-green-50 dark:bg-green-800/50'
    case 'down':
      return 'bg-red-50 dark:bg-red-800/50'
    case 'maintenance':
      return 'bg-yellow-50 dark:bg-amber-700/50'
    case 'retired':
      return 'bg-gray-50 dark:bg-neutral-700/70'
    default:
      return ''
  }
}

export function DataTable<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const isEquipmentTable = columns === equipmentColumns

  const renderColumnFilter = (column: any) => {
    const columnId = column.id

    // Equipment table filters
    if (['name', 'location', 'model', 'serialNumber'].includes(columnId)) {
      return (
        <TextFilter
          column={column}
          placeholder={`Filter ${columnId}...`}
        />
      )
    }

    if (columnId === 'department') {
      return (
        <MultiSelectFilter
          column={column}
          title="Department"
          options={[...DEPARTMENTS]}
        />
      )
    }

    if (columnId === 'status') {
      return (
        <MultiSelectFilter
          column={column}
          title="Status"
          options={[...STATUSES]}
        />
      )
    }

    if (columnId === 'installDate') {
      return <DateRangeFilter column={column} />
    }

    // Maintenance table filters
    if (['description', 'technician'].includes(columnId)) {
      return (
        <TextFilter
          column={column}
          placeholder={`Filter ${columnId}...`}
        />
      )
    }

    if (columnId === 'equipment_name') {
      // Get unique equipment names from the data
      const equipmentNames = Array.from(new Set(
        table.getPreFilteredRowModel().rows.map(row => {
          const equipment = (row.original as any).equipment
          return equipment?.name || ''
        })
      )).filter(Boolean).sort()

      return (
        <MultiSelectFilter
          column={column}
          title="Equipment"
          options={equipmentNames}
        />
      )
    }

    if (columnId === 'partsReplaced') {
      return (
        <TextFilter
          column={column}
          placeholder="Filter parts..."
        />
      )
    }

    if (columnId === 'type') {
      return (
        <MultiSelectFilter
          column={column}
          title="Type"
          options={[...MAINTENANCE_TYPES]}
        />
      )
    }

    if (columnId === 'priority') {
      return (
        <MultiSelectFilter
          column={column}
          title="Priority"
          options={[...PRIORITIES]}
        />
      )
    }

    if (columnId === 'completionStatus') {
      return (
        <MultiSelectFilter
          column={column}
          title="Completion"
          options={[...COMPLETION_STATUSES]}
        />
      )
    }

    if (columnId === 'date') {
      return <DateRangeFilter column={column} />
    }

    if (columnId === 'hoursSpent') {
      return (
        <RangeFilter
          column={column}
          min={1}
          max={24}
          step={1}
          title="Hours"
        />
      )
    }

    return null
  }

  return (
    <div>
      <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
        <Table>
          <TableHeader className="border-b border-neutral-200 dark:border-neutral-800">
            {/* Filter Row */}
            <TableRow className="border-b border-neutral-200 dark:border-neutral-800">
              {table.getAllColumns().map((column) => (
                <TableHead key={column.id} className="p-2">
                  {renderColumnFilter(column)}
                </TableHead>
              ))}
            </TableRow>
            {/* Header Row */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-neutral-200 dark:border-neutral-800">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center justify-between ${
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <div className="ml-2">
                          {{
                            asc: <ArrowUp className="h-4 w-4" />,
                            desc: <ArrowDown className="h-4 w-4" />
                          }[header.column.getIsSorted() as string] ?? (
                            header.column.getCanSort() && (
                              <ArrowUpDown className="h-4 w-4" />
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    'border-b border-neutral-200 dark:border-neutral-800 transition-colors',
                    isEquipmentTable ? getStatusColor(row as Row<Equipment>) : ''
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r border-neutral-200 dark:border-neutral-800 last:border-r-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 