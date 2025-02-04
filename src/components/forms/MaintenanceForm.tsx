import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitMaintenance } from '@/app/actions/maintenance';
import { FormContainer, FormField, FormDescription, RequiredLabel } from '@/components/ui/form-container';
import { MAINTENANCE_TYPES, PRIORITIES, COMPLETION_STATUSES } from '@/types/maintenance';
import { getEquipment } from '@/app/actions/equipment';

export default async function MaintenanceForm() {
  'use server'
  const equipment = await getEquipment();

  return (
    <FormContainer action={submitMaintenance}>
      <FormField>
        <RequiredLabel htmlFor="equipmentId">Equipment</RequiredLabel>
        <FormDescription>
          Select the equipment that requires maintenance.
        </FormDescription>
        <Select name="equipmentId" required>
          <SelectTrigger>
            <SelectValue placeholder="Select equipment" />
          </SelectTrigger>
          <SelectContent>
            {equipment.map(item => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="date">Date</RequiredLabel>
        <FormDescription>
          Date when the maintenance was or will be performed.
        </FormDescription>
        <Input
          type="date"
          id="date"
          name="date"
          required
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="type">Maintenance Type</RequiredLabel>
        <FormDescription>
          Type of maintenance to be performed.
        </FormDescription>
        <Select name="type" defaultValue="Preventive" required>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {MAINTENANCE_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="technician">Technician</RequiredLabel>
        <FormDescription>
          Name of the technician responsible for the maintenance.
        </FormDescription>
        <Input
          id="technician"
          name="technician"
          required
          placeholder="e.g., John Smith"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="hoursSpent">Hours Spent</RequiredLabel>
        <FormDescription>
          Number of hours spent on maintenance. Must be a positive number.
        </FormDescription>
        <Input
          type="number"
          id="hoursSpent"
          name="hoursSpent"
          required
          min="0"
          step="0.5"
          placeholder="e.g., 2.5"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="description">Description</RequiredLabel>
        <FormDescription>
          Detailed description of the maintenance work performed or to be performed.
        </FormDescription>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Describe the maintenance work in detail..."
          className="min-h-[100px]"
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="priority">Priority</RequiredLabel>
        <FormDescription>
          Priority level of the maintenance task.
        </FormDescription>
        <Select name="priority" defaultValue="Medium" required>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="completionStatus">Completion Status</RequiredLabel>
        <FormDescription>
          Current status of the maintenance task.
        </FormDescription>
        <Select name="completionStatus" defaultValue="Scheduled" required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {COMPLETION_STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <Button type="submit" className="w-full">
        Save Maintenance Record
      </Button>
    </FormContainer>
  );
} 