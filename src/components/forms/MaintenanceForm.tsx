'use client';

import { useActionState, useEffect } from 'react';
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
import { useDialog } from '@/components/ui/dialog';
import { submitMaintenance, type FormState } from '@/app/actions/maintenance';
import { FormContainer, FormField, FormDescription, RequiredLabel } from '@/components/ui/form-container';
import { MAINTENANCE_TYPES, PRIORITIES, COMPLETION_STATUSES } from '@/types/maintenance';
import { Equipment } from '@/types/equipment';

const initialState: FormState = { message: undefined, errors: undefined, values: undefined };

export default function MaintenanceForm({ equipment }: { equipment: Equipment[] }) {
  const [state, formAction] = useActionState(submitMaintenance, initialState);
  const { setOpen } = useDialog();

  useEffect(() => {
    if (state?.message === 'Maintenance record created successfully') {
      setOpen(false);
    }
  }, [state?.message, setOpen]);

  return (
    <FormContainer action={formAction}>
      {state?.message && state.message !== 'Maintenance record created successfully' && (
        <div className="mb-4 p-2 text-sm border rounded-md bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {state.message}
        </div>
      )}

      <FormField>
        <RequiredLabel htmlFor="equipmentId">Equipment</RequiredLabel>
        <FormDescription>
          Select the equipment that needs maintenance.
        </FormDescription>
        <Select name="equipmentId" required defaultValue={state?.values?.equipmentId}>
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
        {state?.errors?.equipmentId && (
          <div className="mt-1 text-sm text-red-500">{state.errors.equipmentId.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="date">Date</RequiredLabel>
        <FormDescription>
          Date of maintenance. Cannot be in the future.
        </FormDescription>
        <Input
          type="date"
          id="date"
          name="date"
          required
          max={new Date().toISOString().split('T')[0]}
          defaultValue={state?.values?.date?.toISOString().split('T')[0]}
        />
        {state?.errors?.date && (
          <div className="mt-1 text-sm text-red-500">{state.errors.date.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="type">Maintenance Type</RequiredLabel>
        <FormDescription>
          Select whether this is a preventive, repair, or emergency maintenance.
        </FormDescription>
        <Select name="type" defaultValue={state?.values?.type ?? "Preventive"} required>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {MAINTENANCE_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.type && (
          <div className="mt-1 text-sm text-red-500">{state.errors.type.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="technician">Technician</RequiredLabel>
        <FormDescription>
          Name of the technician (minimum 2 characters).
        </FormDescription>
        <Input
          id="technician"
          name="technician"
          required
          placeholder="e.g., John Smith"
          defaultValue={state?.values?.technician}
        />
        {state?.errors?.technician && (
          <div className="mt-1 text-sm text-red-500">{state.errors.technician.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="hoursSpent">Hours Spent</RequiredLabel>
        <FormDescription>
          Time spent on maintenance (between 0.01 and 24 hours).
        </FormDescription>
        <Input
          type="number"
          id="hoursSpent"
          name="hoursSpent"
          required
          min="0.01"
          max="24"
          placeholder="e.g., 2.5"
          defaultValue={state?.values?.hoursSpent}
        />
        {state?.errors?.hoursSpent && (
          <div className="mt-1 text-sm text-red-500">{state.errors.hoursSpent.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="description">Description</RequiredLabel>
        <FormDescription>
          Detailed description of the maintenance work (minimum 10 characters).
        </FormDescription>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Describe the maintenance work in detail..."
          className="min-h-[100px]"
          defaultValue={state?.values?.description}
        />
        {state?.errors?.description && (
          <div className="mt-1 text-sm text-red-500">{state.errors.description.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="priority">Priority</RequiredLabel>
        <FormDescription>
          Select the urgency level of this maintenance task.
        </FormDescription>
        <Select name="priority" defaultValue={state?.values?.priority ?? "Medium"} required>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.priority && (
          <div className="mt-1 text-sm text-red-500">{state.errors.priority.join(', ')}</div>
        )}
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="completionStatus">Completion Status</RequiredLabel>
        <FormDescription>
          Current progress status of the maintenance task.
        </FormDescription>
        <Select name="completionStatus" defaultValue={state?.values?.completionStatus ?? "Incomplete"} required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {COMPLETION_STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.completionStatus && (
          <div className="mt-1 text-sm text-red-500">{state.errors.completionStatus.join(', ')}</div>
        )}
      </FormField>

      <Button type="submit" className="w-full">
        Save Maintenance Record
      </Button>
    </FormContainer>
  );
} 