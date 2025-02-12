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
import { TextFilter, MultiSelectFilter, DateRangeFilter } from './table/filters'
import { Equipment } from '@/types/equipment'
import { equipmentColumns } from './table/columns'

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
          options={['Machining', 'Assembly', 'Packaging', 'Shipping']}
        />
      )
    }

    if (columnId === 'status') {
      return (
        <MultiSelectFilter
          column={column}
          title="Status"
          options={['Operational', 'Down', 'Maintenance', 'Retired']}
        />
      )
    }

    if (columnId === 'installDate') {
      return <DateRangeFilter column={column} />
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