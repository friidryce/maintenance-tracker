import { equipmentSchema } from '@/schemas/forms';
import { Equipment } from '@/interfaces/data';

export async function submitEquipment(formData: FormData): Promise<Equipment> {
  const id = crypto.randomUUID();
  const rawData = {
    id,
    name: formData.get('name'),
    location: formData.get('location'),
    department: formData.get('department'),
    model: formData.get('model'),
    serialNumber: formData.get('serialNumber'),
    installDate: new Date(formData.get('installDate') as string),
    status: formData.get('status'),
  };

  const result = equipmentSchema.safeParse(rawData);
  
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  try {
    // TODO: Save to database
    console.log('Saving equipment:', result.data);
    return result.data as Equipment;
  } catch (error) {
    throw new Error('Failed to save equipment');
  }
} 