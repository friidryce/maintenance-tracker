'use server';

import { prisma } from '@/lib/db';
import { MaintenanceRecord, MaintenanceCreate, MaintenanceType, Priority, CompletionStatus } from '@/types/maintenance';
import { Prisma } from '@prisma/client';

export async function createMaintenance(data: MaintenanceCreate): Promise<MaintenanceRecord> {
  try {
    console.log('Creating maintenance record with data:', JSON.stringify(data, null, 2));
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid maintenance data: data must be an object');
    }

    const maintenance = await prisma.maintenance_record.create({
      data: {
        ...data,
        date: data.date instanceof Date ? data.date : new Date(data.date),
        partsReplaced: data.partsReplaced ? data.partsReplaced : Prisma.JsonNull,
        hoursSpent: new Prisma.Decimal(data.hoursSpent),
      },
    });
    
    console.log('Maintenance record created successfully:', JSON.stringify(maintenance, null, 2));
    return { ...maintenance, hoursSpent: Number(maintenance.hoursSpent) } as MaintenanceRecord;
  } catch (error) {
    console.error('Error creating maintenance record:', error);
    throw error;
  }
}

export async function getAllMaintenance(): Promise<MaintenanceRecord[]> {
  const records = await prisma.maintenance_record.findMany();
  return records.map(record => ({ ...record, hoursSpent: Number(record.hoursSpent) })) as MaintenanceRecord[];
}

export async function getMaintenanceById(id: string): Promise<MaintenanceRecord | null> {
  const record = await prisma.maintenance_record.findUnique({
    where: { id },
  });
  return record ? { ...record, hoursSpent: Number(record.hoursSpent) } as MaintenanceRecord : null;
}

export async function updateMaintenance(id: string, data: Partial<MaintenanceCreate>): Promise<MaintenanceRecord> {
  const { partsReplaced, date, hoursSpent, ...rest } = data;
  const record = await prisma.maintenance_record.update({
    where: { id },
    data: {
      ...rest,
      ...(date && { date: date instanceof Date ? date : new Date(date) }),
      ...(partsReplaced !== undefined && { partsReplaced: partsReplaced || Prisma.JsonNull }),
      ...(hoursSpent !== undefined && { hoursSpent: new Prisma.Decimal(hoursSpent) }),
    },
  });
  return { ...record, hoursSpent: Number(record.hoursSpent) } as MaintenanceRecord;
}

export async function deleteMaintenance(id: string): Promise<MaintenanceRecord> {
  const record = await prisma.maintenance_record.delete({
    where: { id },
  });
  return { ...record, hoursSpent: Number(record.hoursSpent) } as MaintenanceRecord;
} 