'use client';

import { ColumnDef } from '@tanstack/react-table'
import { Equipment, MaintenanceRecord } from '@/interfaces/data'

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