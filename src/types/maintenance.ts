import { maintenance_record as PrismaMaintenanceRecord, Prisma } from '@prisma/client';

export const MAINTENANCE_TYPES = ['Preventive', 'Repair', 'Emergency'] as const;
export type MaintenanceType = typeof MAINTENANCE_TYPES[number];

export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export type Priority = typeof PRIORITIES[number];

export const COMPLETION_STATUSES = ['Complete', 'Incomplete', 'Pending Parts'] as const;
export type CompletionStatus = typeof COMPLETION_STATUSES[number];

export interface MaintenanceRecord extends Omit<PrismaMaintenanceRecord, 'type' | 'priority' | 'completionStatus' | 'hoursSpent' | 'partsReplaced'> {
  type: MaintenanceType;
  priority: Priority;
  completionStatus: CompletionStatus;
  hoursSpent: number;
  partsReplaced?: string[];
}

export type MaintenanceCreate = Omit<MaintenanceRecord, 'id'>;
export type MaintenanceUpdate = Partial<Omit<MaintenanceRecord, 'id'>>; 