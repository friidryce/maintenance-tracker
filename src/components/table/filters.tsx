'use client'

import { Column } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DualRangeSlider } from '@/components/ui/slider'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useState, useCallback, useRef, useEffect } from 'react'
import { DateRange } from 'react-day-picker'

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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

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
      <PopoverContent align="center" sideOffset={4} className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={(range) => {
            setDateRange(range)
            if (range?.from && range?.to) {
              column.setFilterValue([range.from, range.to])
            } else {
              column.setFilterValue(undefined)
            }
          }}
          numberOfMonths={2}
          disabled={{ after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  )
}

interface RangeFilterProps<TData> {
  column: Column<TData>
  min: number
  max: number
  step: number
  title: string
}

export function RangeFilter<TData>({
  column,
  min,
  max,
  step,
  title
}: RangeFilterProps<TData>) {
  const [range, setRange] = useState<[number, number]>([min, max])

  const updateValue = useCallback((value: [number, number]) => {
    setRange(value)
    setTimeout(() => {
      column.setFilterValue(value)
    }, 150) // Increased delay to better handle rapid movements
  }, [column])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full min-w-[140px] justify-start text-left font-normal">
          {title}: {range[0]} - {range[1]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{range[0]}</span>
            <span>{range[1]}</span>
          </div>
          <DualRangeSlider
            min={min}
            max={max}
            step={step}
            value={range}
            onValueChange={updateValue}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
} 