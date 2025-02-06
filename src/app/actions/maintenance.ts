'use server';
import { maintenanceSchema } from '@/schemas/forms';
import { createMaintenance, getAllMaintenance, updateMaintenance as updateMaintenanceService, deleteMaintenance as deleteMaintenanceService } from '@/services/maintenanceService';
import { MaintenanceRecord, MaintenanceCreate, MaintenanceType, Priority, CompletionStatus } from '@/types/maintenance';
import { revalidatePath } from 'next/cache';

export type FormState = {
  errors?: {
    [K in keyof MaintenanceCreate]?: string[];
  };
  message?: string;
  values?: Partial<MaintenanceCreate>;
};

export async function submitMaintenance(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    const rawData = {
      equipmentId: formData.get('equipmentId') as string,
      date: new Date(formData.get('date') as string),
      type: formData.get('type') as MaintenanceType,
      technician: formData.get('technician') as string,
      hoursSpent: Number(formData.get('hoursSpent')),
      description: formData.get('description') as string,
      priority: formData.get('priority') as Priority,
      completionStatus: formData.get('completionStatus') as CompletionStatus,
    };

    const result = maintenanceSchema.safeParse(rawData);
    
    if (!result.success) {
      const fieldErrors: FormState['errors'] = {};
      result.error.errors.forEach(error => {
        const field = error.path[0] as keyof MaintenanceCreate;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field]?.push(error.message);
      });
      return { errors: fieldErrors, values: rawData };
    }

    const maintenance = await createMaintenance(result.data as MaintenanceCreate);
    
    if (maintenance) {
      revalidatePath('/maintenance-records');
      return { message: 'Maintenance record created successfully' };
    }
    return { message: 'Failed to create maintenance record', values: rawData };
  } catch (error) {
    console.error('Error in submitMaintenance:', error);
    const rawData = {
      equipmentId: formData.get('equipmentId') as string,
      date: new Date(formData.get('date') as string),
      type: formData.get('type') as MaintenanceType,
      technician: formData.get('technician') as string,
      hoursSpent: Number(formData.get('hoursSpent')),
      description: formData.get('description') as string,
      priority: formData.get('priority') as Priority,
      completionStatus: formData.get('completionStatus') as CompletionStatus,
    };
    return { 
      message: error instanceof Error ? error.message : 'Failed to save maintenance record',
      values: rawData
    };
  }
}

export async function getMaintenance(): Promise<MaintenanceRecord[]> {
  return getAllMaintenance();
}

export async function updateMaintenance(id: string, data: Partial<MaintenanceCreate>): Promise<MaintenanceRecord> {
  const maintenance = await updateMaintenanceService(id, data);
  revalidatePath('/maintenance-records');
  return maintenance;
}

export async function deleteMaintenance(id: string): Promise<void> {
  await deleteMaintenanceService(id);
  revalidatePath('/maintenance-records');
} 