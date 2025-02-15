'use client';

import { ColumnDef } from '@tanstack/react-table'
import { Equipment } from '@/types/equipment'
import { MaintenanceRecord } from '@/types/maintenance'
import { Badge } from '@/components/ui/badge'
import { JSX } from 'react'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { deleteRecord } from '@/app/actions/records'
import EquipmentForm from '@/components/forms/EquipmentForm'
import MaintenanceForm from '@/components/forms/MaintenanceForm'

const ActionButtons = ({ 
  row, 
  type,
  equipment,
  onDelete 
}: { 
  row: any, 
  type: 'equipment' | 'maintenance',
  equipment?: Equipment[],
  onDelete: () => Promise<void>
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-2 justify-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500 relative z-10 before:absolute before:inset-0 before:bg-background/80 before:-z-10"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Edit {type === 'equipment' ? 'Equipment' : 'Maintenance Record'}</DialogTitle>
            <DialogDescription>
              Update the details below.
            </DialogDescription>
          </DialogHeader>
          {type === 'equipment' ? (
            <EquipmentForm initialData={row.original} onSuccess={() => setOpen(false)} />
          ) : (
            <MaintenanceForm equipment={equipment || []} initialData={row.original} onSuccess={() => setOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
      <Button 
        variant="outline" 
        size="sm"
        className="bg-red-500/20 hover:bg-red-500/30 border-red-500 relative z-10 before:absolute before:inset-0 before:bg-background/80 before:-z-10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this equipment?')) {
          await deleteRecord('equipment', row.original.id)
        }
      }

      return (
        <ActionButtons
          row={row}
          type="equipment"
          onDelete={handleDelete}
        />
      )
    }
  }
]

export const maintenanceColumns: ColumnDef<MaintenanceRecord>[] = [
  {
    id: 'equipment_name',
    header: 'Equipment',
    accessorFn: (row: MaintenanceRecord & { equipment?: { name: string } }) => row.equipment?.name,
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const equipmentNames = value as string[]
      if (!equipmentNames?.length) return true
      const rowValue = row.getValue(id) as string
      return equipmentNames.includes(rowValue)
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date
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
    accessorKey: 'type',
    header: 'Type',
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const types = value as string[]
      if (!types?.length) return true
      const rowValue = row.getValue(id) as string
      return types.includes(rowValue)
    }
  },
  {
    accessorKey: 'technician',
    header: 'Technician',
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'hoursSpent',
    header: 'Hours Spent',
    sortingFn: 'alphanumeric',
    filterFn: (row, id, value) => {
      const [min, max] = value as [number, number]
      const hours = row.getValue(id) as number
      
      if (!min || !max) return true
      return hours >= min && hours <= max
    }
  },
  {
    accessorKey: 'description',
    header: 'Description',
    sortingFn: 'text',
    filterFn: 'includesString'
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const priorities = value as string[]
      if (!priorities?.length) return true
      const rowValue = row.getValue(id) as string
      return priorities.includes(rowValue)
    }
  },
  {
    accessorKey: 'completionStatus',
    header: 'Status',
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const statuses = value as string[]
      if (!statuses?.length) return true
      const rowValue = row.getValue(id) as string
      return statuses.includes(rowValue)
    }
  },
  {
    accessorKey: 'partsReplaced',
    header: 'Parts Replaced',
    cell: ({ row }): JSX.Element | null => {
      const parts = row.getValue('partsReplaced') as string | null;
      if (!parts) return null;
      try {
        const parsedParts = JSON.parse(parts) as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {parsedParts.map((part: string, index: number) => (
              <Badge key={index} variant="secondary">
                {part}
              </Badge>
            ))}
          </div>
        );
      } catch {
        return null;
      }
    },
    sortingFn: 'text',
    filterFn: (row, id, value) => {
      const parts = row.getValue(id) as string | null;
      if (!parts || !value) return true;
      try {
        const parsedParts = JSON.parse(parts) as string[];
        const searchValue = (value as string).toLowerCase();
        return parsedParts.some(part => 
          part.toLowerCase().includes(searchValue)
        );
      } catch {
        return false;
      }
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row, table }) => {
      const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this maintenance record?')) {
          await deleteRecord('maintenance', row.original.id)
        }
      }

      // Get equipment list from the table meta
      const equipment = (table.options.meta as { equipment?: Equipment[] })?.equipment || []

      return (
        <ActionButtons
          row={row}
          type="maintenance"
          equipment={equipment}
          onDelete={handleDelete}
        />
      )
    }
  }
]