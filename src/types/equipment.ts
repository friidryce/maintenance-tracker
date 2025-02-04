import { Equipment as PrismaEquipment } from '@prisma/client';

export const DEPARTMENTS = ['Machining', 'Assembly', 'Packaging', 'Shipping'] as const;
export const STATUSES = ['Operational', 'Down', 'Maintenance', 'Retired'] as const;

export type Department = typeof DEPARTMENTS[number];
export type Status = typeof STATUSES[number];

// Extend Prisma's Equipment type with our constrained types
export interface Equipment extends Omit<PrismaEquipment, 'department' | 'status'> {
  department: Department;
  status: Status;
}

// Type for creating new equipment (omitting id)
export type EquipmentCreate = Omit<Equipment, 'id'>;

// Type for updating equipment (all fields optional except id)
export type EquipmentUpdate = Partial<Omit<Equipment, 'id'>> & { id: string }; 