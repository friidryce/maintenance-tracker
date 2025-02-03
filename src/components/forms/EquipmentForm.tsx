'use client';

import { useFormStatus } from 'react-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitEquipment } from '@/app/actions/equipment';

const departments = ['Machining', 'Assembly', 'Packaging', 'Shipping'] as const;
const statuses = ['Operational', 'Down', 'Maintenance', 'Retired'] as const;

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <Label htmlFor={htmlFor}>
      {children}
      <span className="text-red-500 ml-1" aria-label="required">*</span>
    </Label>
  );
}

export default function EquipmentForm() {
  const { pending } = useFormStatus();

  return (
    <form action={submitEquipment} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="name">Name</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A unique identifier for the equipment. Must be at least 3 characters long.
        </p>
        <Input
          id="name"
          name="name"
          required
          minLength={3}
          placeholder="e.g., CNC Machine 01"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="location">Location</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Physical location of the equipment in the facility.
        </p>
        <Input
          id="location"
          name="location"
          required
          placeholder="e.g., Building A, Room 101"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="department">Department</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Department responsible for this equipment. Select from the available options.
        </p>
        <Select name="department" defaultValue="Machining" required>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="model">Model</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Equipment model number or name as specified by the manufacturer.
        </p>
        <Input
          id="model"
          name="model"
          required
          placeholder="e.g., XYZ-1000"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="serialNumber">Serial Number</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Unique serial number from the manufacturer. Must contain only letters and numbers.
        </p>
        <Input
          id="serialNumber"
          name="serialNumber"
          required
          pattern="[a-zA-Z0-9]+"
          placeholder="e.g., ABC123XYZ"
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="installDate">Install Date</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Date when the equipment was installed. Cannot be a future date.
        </p>
        <Input
          type="date"
          id="installDate"
          name="installDate"
          required
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="space-y-2">
        <RequiredLabel htmlFor="status">Status</RequiredLabel>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current operational status of the equipment. Select from the available options.
        </p>
        <Select name="status" defaultValue="Operational" required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Saving...' : 'Save Equipment'}
      </Button>
    </form>
  );
} 