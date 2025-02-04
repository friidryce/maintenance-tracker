'use client';

import { useFormStatus } from 'react-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitEquipment } from '@/app/actions/equipment';
import { FormContainer, FormField, FormDescription, RequiredLabel } from '@/components/ui/form-container';
import { Equipment } from '@/interfaces/data';

const departments = ['Machining', 'Assembly', 'Packaging', 'Shipping'] as const;
const statuses = ['Operational', 'Down', 'Maintenance', 'Retired'] as const;

interface EquipmentFormProps {
  onSubmitSuccess?: (equipment: Equipment) => void;
  onClose?: () => void;
}

export default function EquipmentForm({ onSubmitSuccess, onClose }: EquipmentFormProps) {
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    try {
      const equipment = await submitEquipment(formData);
      onSubmitSuccess?.(equipment);
      onClose?.();
    } catch (error) {
      console.error('Failed to submit equipment:', error);
    }
  }

  return (
    <FormContainer action={handleSubmit}>
      <FormField>
        <RequiredLabel htmlFor="name">Name</RequiredLabel>
        <FormDescription>
          A unique identifier for the equipment. Must be at least 3 characters long.
        </FormDescription>
        <Input
          id="name"
          name="name"
          required
          minLength={3}
          placeholder="e.g., CNC Machine 01"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="location">Location</RequiredLabel>
        <FormDescription>
          Physical location of the equipment in the facility.
        </FormDescription>
        <Input
          id="location"
          name="location"
          required
          placeholder="e.g., Building A, Room 101"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="department">Department</RequiredLabel>
        <FormDescription>
          Department responsible for this equipment.
        </FormDescription>
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
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="model">Model</RequiredLabel>
        <FormDescription>
          Equipment model number or name as specified by the manufacturer.
        </FormDescription>
        <Input
          id="model"
          name="model"
          required
          placeholder="e.g., XYZ-1000"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="serialNumber">Serial Number</RequiredLabel>
        <FormDescription>
          Unique serial number from the manufacturer. Must contain only letters and numbers.
        </FormDescription>
        <Input
          id="serialNumber"
          name="serialNumber"
          required
          pattern="[a-zA-Z0-9]+"
          placeholder="e.g., ABC123XYZ"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="installDate">Install Date</RequiredLabel>
        <FormDescription>
          Date when the equipment was installed. Cannot be a future date.
        </FormDescription>
        <Input
          type="date"
          id="installDate"
          name="installDate"
          required
          max={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="status">Status</RequiredLabel>
        <FormDescription>
          Current operational status of the equipment.
        </FormDescription>
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
      </FormField>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Saving...' : 'Save Equipment'}
      </Button>
    </FormContainer>
  );
} 