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
import { Input } from '@/components/ui/input'
import { Equipment, MaintenanceRecord } from '@/interfaces/data'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  searchKey?: string
}

export function DataTable<TData>({
  columns,
  data,
  searchKey,
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

  return (
    <div>
      {searchKey && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search"
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => {
                  return (
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r last:border-r-0">
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

// Column definitions for Equipment
export const equipmentColumns: ColumnDef<Equipment>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    sortingFn: 'text'
  },
  {
    accessorKey: 'location',
    header: 'Location',
    sortingFn: 'text'
  },
  {
    accessorKey: 'department',
    header: 'Department',
    sortingFn: 'text'
  },
  {
    accessorKey: 'model',
    header: 'Model',
    sortingFn: 'text'
  },
  {
    accessorKey: 'serialNumber',
    header: 'Serial Number',
    sortingFn: 'text'
  },
  {
    accessorKey: 'installDate',
    header: 'Install Date',
    cell: ({ row }) => {
      const date = row.getValue('installDate') as Date
      return date.toLocaleDateString()
    },
    sortingFn: 'datetime'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    sortingFn: 'text'
  },
]

// Column definitions for MaintenanceRecord
export const maintenanceColumns: ColumnDef<MaintenanceRecord>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
      return date.toLocaleDateString()
    },
    sortingFn: 'datetime'
  },
  {
    accessorKey: 'type',
    header: 'Type',
    sortingFn: 'text'
  },
  {
    accessorKey: 'technician',
    header: 'Technician',
    sortingFn: 'text'
  },
  {
    accessorKey: 'hoursSpent',
    header: 'Hours Spent',
    sortingFn: 'alphanumeric'
  },
  {
    accessorKey: 'description',
    header: 'Description',
    sortingFn: 'text'
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    sortingFn: 'text'
  },
  {
    accessorKey: 'completionStatus',
    header: 'Status',
    sortingFn: 'text'
  },
] 