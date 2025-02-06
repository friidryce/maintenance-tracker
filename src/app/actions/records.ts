'use server';

import { maintenanceSchema, equipmentSchema } from '@/schemas/forms';
import { createRecord, getAllRecords, updateRecord as updateRecordService, deleteRecord as deleteRecordService } from '@/services/recordService';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type FormState<T> = {
  errors?: {
    [K in keyof T]?: string[];
  };
  message?: string;
  values?: Partial<T>;
};

type RecordType = 'maintenance' | 'equipment';

const configs: Record<RecordType, { schema: z.ZodSchema; path: string }> = {
  maintenance: {
    schema: maintenanceSchema,
    path: '/maintenance-records'
  },
  equipment: {
    schema: equipmentSchema,
    path: '/equipment'
  }
};

export async function submitRecord(type: RecordType, formData: FormData) {
  const config = configs[type];
  const rawData = Object.fromEntries(formData.entries());
  const result = config.schema.safeParse(rawData)

  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const record = await createRecord(type, result.data);
  
  if (record) {
    revalidatePath(config.path);
  } else {
    throw new Error(`Failed to create ${type}`);
  }
}

export async function getRecords(type: RecordType) {
  return getAllRecords(type);
}

export async function updateRecord(type: RecordType, id: string, data: unknown) {
  const config = configs[type];
  const result = config.schema.safeParse(data);
  
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const record = await updateRecordService(type, id, result.data);
  revalidatePath(config.path);
  return record;
}

export async function deleteRecord(type: RecordType, id: string) {
  const config = configs[type];
  await deleteRecordService(type, id);
  revalidatePath(config.path);
} 