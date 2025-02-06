'use client';

import { useTransition, useState, useCallback } from 'react';
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
import { submitRecord } from '@/app/actions/records';
import { FormContainer, FormField, FormDescription, RequiredLabel } from '@/components/ui/form-container';
import { MAINTENANCE_TYPES, PRIORITIES, COMPLETION_STATUSES } from '@/types/maintenance';
import { Equipment } from '@/types/equipment';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MaintenanceFormProps {
  equipment: Equipment[];
}

export default function MaintenanceForm({ equipment }: MaintenanceFormProps) {
  const [isPending, startTransition] = useTransition();
  const { setOpen } = useDialog();
  const [date, setDate] = useState<Date>();
  const [parts, setParts] = useState<string[]>([]);

  const handlePartInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.endsWith(' ')) {
      const part = value.trim();
      if (part) {
        setParts(prev => [...prev, part]);
        e.target.value = '';
      }
    }
  }, []);

  const removePart = useCallback((index: number) => {
    setParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await submitRecord('maintenance', formData);
        setOpen(false);
      } catch (error) {
        console.error('Failed to submit:', error);
      }
    });
  }

  return (
    <FormContainer action={handleSubmit}>
      <FormField>
        <RequiredLabel htmlFor="equipmentId">Equipment</RequiredLabel>
        <FormDescription>
          Select the equipment that needs maintenance.
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
          Date of maintenance. Cannot be in the future.
        </FormDescription>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input
          type="hidden"
          name="date"
          value={date?.toISOString() ?? ''}
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="type">Maintenance Type</RequiredLabel>
        <FormDescription>
          Select whether this is a preventive, repair, or emergency maintenance.
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
          Name of the technician (minimum 2 characters).
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
          Time spent on maintenance (between 1 and 24 hours).
        </FormDescription>
        <Input
          type="number"
          id="hoursSpent"
          name="hoursSpent"
          required
          min="1"
          max="24"
          placeholder="e.g., 2"
        />
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
        />
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="partsReplaced">Parts Replaced</RequiredLabel>
        <FormDescription>
          List any parts that were replaced during maintenance. Press space to add a part.
        </FormDescription>
        <div className="space-y-2">
          <Input
            onChange={handlePartInput}
            placeholder="Type and press space to add parts"
          />
          {parts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {parts.map((part, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20"
                  onClick={() => removePart(index)}
                >
                  {part}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
          <input
            type="hidden"
            name="partsReplaced"
            value={JSON.stringify(parts)}
          />
        </div>
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="priority">Priority</RequiredLabel>
        <FormDescription>
          Select the urgency level of this maintenance task.
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
          Current progress status of the maintenance task.
        </FormDescription>
        <Select name="completionStatus" defaultValue="Incomplete" required>
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

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Maintenance Record'}
      </Button>
    </FormContainer>
  );
} 