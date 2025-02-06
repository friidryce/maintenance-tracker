import { maintenance_record as PrismaMaintenanceRecord} from '@prisma/client';

export const MAINTENANCE_TYPES = ['Preventive', 'Repair', 'Emergency'] as const;
export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export const COMPLETION_STATUSES = ['Complete', 'Incomplete', 'Pending Parts'] as const;

export type MaintenanceType = typeof MAINTENANCE_TYPES[number];
export type Priority = typeof PRIORITIES[number];
export type CompletionStatus = typeof COMPLETION_STATUSES[number];

export interface MaintenanceRecord extends Omit<PrismaMaintenanceRecord, 'type' | 'priority' | 'completionStatus'> {
  type: MaintenanceType;
  priority: Priority;
  completionStatus: CompletionStatus;
}

export type MaintenanceCreate = Omit<MaintenanceRecord, 'id'>;
export type MaintenanceUpdate = Partial<Omit<MaintenanceRecord, 'id'>> & { id: string }; 