'use server'
import { equipmentSchema } from '@/schemas/forms';
import { Equipment, EquipmentCreate, Department, Status } from '@/types/equipment';
import { createEquipment, getAllEquipment, updateEquipment as updateEquipmentService, deleteEquipment as deleteEquipmentService } from '@/services/equipmentService';
import { revalidatePath } from 'next/cache';

export async function submitEquipment(formData: FormData) {
  try {
    const formEntries = Object.fromEntries(formData.entries());
    console.log('Form data received:', JSON.stringify(formEntries, null, 2));
    
    const rawData = {
      name: formData.get('name'),
      location: formData.get('location'),
      department: formData.get('department') as Department,
      model: formData.get('model'),
      serialNumber: formData.get('serialNumber'),
      installDate: new Date(formData.get('installDate') as string),
      status: formData.get('status') as Status,
    };
    
    console.log('Parsed raw data:', JSON.stringify(rawData, null, 2));

    const result = equipmentSchema.safeParse(rawData);
    
    if (!result.success) {
      console.error('Validation error:', JSON.stringify(result.error.errors, null, 2));
      throw new Error(result.error.errors[0].message);
    }

    console.log('Validation passed, data:', JSON.stringify(result.data, null, 2));

    const equipment = await createEquipment(result.data as EquipmentCreate);
    console.log('Equipment created:', JSON.stringify(equipment, null, 2));
    
    if (equipment) {
      revalidatePath('/equipment');
    }
  } catch (error) {
    console.error('Error in submitEquipment:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error instanceof Error ? error : new Error('Failed to save equipment');
  }
}

export async function getEquipment(): Promise<Equipment[]> {
  return getAllEquipment();
}

export async function updateEquipment(id: string, data: Partial<EquipmentCreate>): Promise<Equipment> {
  const equipment = await updateEquipmentService(id, data);
  revalidatePath('/equipment');
  return equipment;
}

export async function deleteEquipment(id: string): Promise<void> {
  await deleteEquipmentService(id);
  revalidatePath('/equipment');
} 