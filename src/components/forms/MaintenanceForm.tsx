'use client';

import { useFormStatus } from 'react-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitMaintenance } from '@/app/actions/maintenance';

const maintenanceTypes = ['Preventive', 'Corrective', 'Inspection'] as const;
const priorities = ['Low', 'Medium', 'High', 'Critical'] as const;
const completionStatuses = ['Scheduled', 'In Progress', 'Completed', 'Delayed'] as const;

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <Label htmlFor={htmlFor}>
      {children}
      <span className="text-red-500 ml-1" aria-label="required">*</span>
    </Label>
  );
}

interface MaintenanceFormProps {
  equipmentOptions: Array<{ id: string; name: string; }>;
}

export default function MaintenanceForm({ equipmentOptions }: MaintenanceFormProps) {
  const { pending } = useFormStatus();

  return (
    <form action={submitMaintenance} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="equipmentId">Equipment</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select the equipment that requires maintenance.
        </p>
        <Select name="equipmentId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select equipment" />
          </SelectTrigger>
          <SelectContent>
            {equipmentOptions.map(equipment => (
              <SelectItem key={equipment.id} value={equipment.id}>
                {equipment.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="date">Date</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Date when the maintenance was or will be performed. Cannot be a past date.
        </p>
        <Input
          type="date"
          id="date"
          name="date"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="type">Maintenance Type</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Type of maintenance to be performed.
        </p>
        <Select name="type" defaultValue="Preventive" required>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {maintenanceTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="technician">Technician</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Name of the technician responsible for the maintenance.
        </p>
        <Input
          id="technician"
          name="technician"
          required
          placeholder="e.g., John Smith"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="hoursSpent">Hours Spent</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Number of hours spent on maintenance. Must be a positive number.
        </p>
        <Input
          type="number"
          id="hoursSpent"
          name="hoursSpent"
          required
          min="0"
          step="0.5"
          placeholder="e.g., 2.5"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="description">Description</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Detailed description of the maintenance work performed or to be performed.
        </p>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Describe the maintenance work in detail..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="priority">Priority</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Priority level of the maintenance task.
        </p>
        <Select name="priority" defaultValue="Medium" required>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="completionStatus">Completion Status</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current status of the maintenance task.
        </p>
        <Select name="completionStatus" defaultValue="Scheduled" required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {completionStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Saving...' : 'Save Maintenance Record'}
      </Button>
    </form>
  );
} 