'use client'

import { Column } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface TextFilterProps<TData> {
  column: Column<TData>
  placeholder: string
}

export function TextFilter<TData>({ column, placeholder }: TextFilterProps<TData>) {
  return (
    <Input
      placeholder={placeholder}
      value={(column.getFilterValue() as string) ?? ''}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className="w-full"
    />
  )
}

interface MultiSelectFilterProps<TData> {
  column: Column<TData>
  title: string
  options: string[]
}

export function MultiSelectFilter<TData>({
  column,
  title,
  options,
}: MultiSelectFilterProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">{title}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={column.getFilterValue() as string[] | undefined
              ? (column.getFilterValue() as string[])?.includes(option)
              : false
            }
            onCheckedChange={(checked) => {
              const currentValue = (column.getFilterValue() as string[]) || []
              const newValue = checked
                ? [...currentValue, option]
                : currentValue.filter((value) => value !== option)
              column.setFilterValue(newValue.length ? newValue : undefined)
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DateRangeFilterProps<TData> {
  column: Column<TData>
}

export function DateRangeFilter<TData>({ column }: DateRangeFilterProps<TData>) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  return (
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
  )
} 