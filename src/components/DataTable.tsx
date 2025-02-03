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
import { Input } from '@/components/ui/input'
import { Equipment, MaintenanceRecord } from '@/interfaces/data'
import { ArrowUpDown, ArrowUp, ArrowDown, Calendar as CalendarIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  searchKey?: string
}

const getStatusColor = (row: Row<any>) => {
  const status = row.getValue('status')
  
  switch (status?.toString().toLowerCase()) {
    case 'operational':
      return 'bg-green-50 dark:bg-green-950/30'
    case 'down':
      return 'bg-red-50 dark:bg-red-950/30'
    case 'maintenance':
      return 'bg-yellow-50 dark:bg-yellow-950/30'
    case 'retired':
      return 'bg-gray-50 dark:bg-gray-800/30'
    default:
      return ''
  }
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export function DataTable<TData>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

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
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-b">
            {/* Filter Row */}
            <TableRow className="border-b">
              {table.getAllColumns().map((column) => {
                const columnId = column.id
                return (
                  <TableHead key={column.id} className="p-2">
                    {columnId === 'name' || columnId === 'location' || 
                     columnId === 'model' || columnId === 'serialNumber' ? (
                      <Input
                        placeholder={`Filter ${columnId}...`}
                        value={(column.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                          column.setFilterValue(event.target.value)
                        }
                        className="w-full"
                      />
                    ) : columnId === 'department' ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">Department</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                          {['Machining', 'Assembly', 'Packaging', 'Shipping'].map((department) => (
                            <DropdownMenuCheckboxItem
                              key={department}
                              checked={column.getFilterValue() as string[] | undefined
                                ? (column.getFilterValue() as string[])?.includes(department)
                                : false
                              }
                              onCheckedChange={(checked) => {
                                const currentValue = (column.getFilterValue() as string[]) || []
                                const newValue = checked
                                  ? [...currentValue, department]
                                  : currentValue.filter((value) => value !== department)
                                column.setFilterValue(newValue.length ? newValue : undefined)
                              }}
                            >
                              {department}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : columnId === 'status' ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full">Status</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                          {['Operational', 'Down', 'Maintenance', 'Retired'].map((status) => (
                            <DropdownMenuCheckboxItem
                              key={status}
                              checked={column.getFilterValue() as string[] | undefined
                                ? (column.getFilterValue() as string[])?.includes(status)
                                : false
                              }
                              onCheckedChange={(checked) => {
                                const currentValue = (column.getFilterValue() as string[]) || []
                                const newValue = checked
                                  ? [...currentValue, status]
                                  : currentValue.filter((value) => value !== status)
                                column.setFilterValue(newValue.length ? newValue : undefined)
                              }}
                            >
                              {status}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : columnId === 'installDate' ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "MM/dd/yy")} -{" "}
                                  {format(dateRange.to, "MM/dd/yy")}
                                </>
                              ) : (
                                format(dateRange.from, "MM/dd/yy")
                              )
                            ) : (
                              <span>Date Range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            selected={{ from: dateRange?.from, to: dateRange?.to }}
                            onSelect={(range: any) => {
                              setDateRange(range)
                              if (range?.from && range?.to) {
                                column.setFilterValue([range.from, range.to])
                              } else {
                                column.setFilterValue(undefined)
                              }
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : null}
                  </TableHead>
                )
              })}
            </TableRow>
            {/* Header Row */}
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
                  className={cn(
                    'border-b transition-colors',
                    getStatusColor(row)
                  )}
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
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'location',
    header: 'Location',
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'department',
    header: 'Department',
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const departments = value as string[]
      if (!departments?.length) return true
      const rowValue = row.getValue(id) as string
      return departments.includes(rowValue)
    }
  },
  {
    accessorKey: 'model',
    header: 'Model',
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'serialNumber',
    header: 'Serial Number',
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'installDate',
    header: 'Install Date',
    cell: ({ row }) => {
      const date = row.getValue('installDate') as Date
      return date.toLocaleDateString()
    },
    sortingFn: 'datetime',
    filterFn: (row, id, value) => {
      const [start, end] = value as [Date, Date]
      const cellDate = row.getValue(id) as Date
      
      if (!start || !end) return true
      const date = new Date(cellDate)
      return date >= start && date <= end
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const statuses = value as string[]
      if (!statuses?.length) return true
      const rowValue = row.getValue(id) as string
      return statuses.includes(rowValue)
    }
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