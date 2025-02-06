'use client';

import { useTransition } from 'react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { DEPARTMENTS, STATUSES } from '@/types/equipment';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function EquipmentForm() {
  const [isPending, startTransition] = useTransition();
  const { setOpen } = useDialog();
  const [date, setDate] = useState<Date>();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await submitRecord('equipment', formData);
        setOpen(false);
      } catch (error) {
        console.error('Failed to submit:', error);
      }
    });
  }

  return (
    <FormContainer action={onSubmit}>
      <FormField>
        <RequiredLabel htmlFor="name">Name</RequiredLabel>
        <FormDescription>
          A unique identifier for the equipment (minimum 3 characters).
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
            {DEPARTMENTS.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <FormField>
        <RequiredLabel htmlFor="model">Model</RequiredLabel>
        <FormDescription>
          Equipment model number or name.
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
          Unique serial number (letters and numbers only).
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
          Date when the equipment was installed (cannot be in the future).
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
              autoFocus
            />
          </PopoverContent>
        </Popover>

        <input
          type="hidden"
          name="installDate"
          value={date?.toISOString() ?? ''}
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
            {STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save Equipment'}
      </Button>
    </FormContainer>
  );
} 