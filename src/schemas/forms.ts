import { z } from 'zod';

const departments = ['Machining', 'Assembly', 'Packaging', 'Shipping'] as const;
const statuses = ['Operational', 'Down', 'Maintenance', 'Retired'] as const;
const maintenanceTypes = ['Preventive', 'Repair', 'Emergency'] as const;
const priorities = ['Low', 'Medium', 'High'] as const;
const completionStatuses = ['Complete', 'Incomplete', 'Pending Parts'] as const;

export const equipmentSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters'),
  location: z.string()
    .min(1, 'Location is required'),
  department: z.enum(departments, {
    errorMap: () => ({ message: 'Invalid department' })
  }),
  model: z.string()
    .min(1, 'Model is required'),
  serialNumber: z.string()
    .regex(/^[a-zA-Z0-9]+$/, 'Serial Number must be alphanumeric'),
  installDate: z.date()
    .max(new Date(), 'Install Date cannot be in the future'),
  status: z.enum(statuses, {
    errorMap: () => ({ message: 'Invalid status' })
  })
});

export const maintenanceSchema = z.object({
  equipmentId: z.string()
    .min(1, 'Equipment selection is required'),
  date: z.date()
    .max(new Date(), 'Date cannot be in the future'),
  type: z.enum(maintenanceTypes, {
    errorMap: () => ({ message: 'Invalid maintenance type' })
  }),
  technician: z.string()
    .min(2, 'Technician name must be at least 2 characters'),
  hoursSpent: z.number()
    .min(0.1, 'Hours must be greater than 0')
    .max(24, 'Hours cannot exceed 24'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters'),
  partsReplaced: z.array(z.string()).optional(),
  priority: z.enum(priorities, {
    errorMap: () => ({ message: 'Invalid priority' })
  }),
  completionStatus: z.enum(completionStatuses, {
    errorMap: () => ({ message: 'Invalid completion status' })
  })
});

export type EquipmentFormData = z.infer<typeof equipmentSchema>;
export type MaintenanceFormData = z.infer<typeof maintenanceSchema>; 