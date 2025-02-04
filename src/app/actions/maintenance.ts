'use server';
import { maintenanceSchema } from '@/schemas/forms';
import { createMaintenance, getAllMaintenance, updateMaintenance as updateMaintenanceService, deleteMaintenance as deleteMaintenanceService } from '@/services/maintenanceService';
import { MaintenanceRecord, MaintenanceCreate } from '@/types/maintenance';
import { revalidatePath } from 'next/cache';

export async function submitMaintenance(formData: FormData) {
  try {
    const rawData = {
      equipmentId: formData.get('equipmentId'),
      date: new Date(formData.get('date') as string),
      type: formData.get('type'),
      technician: formData.get('technician'),
      hoursSpent: Number(formData.get('hoursSpent')),
      description: formData.get('description'),
      priority: formData.get('priority'),
      completionStatus: formData.get('completionStatus'),
    };

    const result = maintenanceSchema.safeParse(rawData);
    
    if (!result.success) {
      console.error('Validation error:', result.error.errors);
      throw new Error(result.error.errors[0].message);
    }

    const maintenance = await createMaintenance(result.data as MaintenanceCreate);
    
    if (maintenance) {
      revalidatePath('/maintenance-records');
    }
  } catch (error) {
    console.error('Error in submitMaintenance:', error);
    throw error instanceof Error ? error : new Error('Failed to save maintenance record');
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