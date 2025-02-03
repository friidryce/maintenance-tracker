import { equipmentSchema } from '@/schemas/forms';

export async function submitEquipment(formData: FormData) {
  const rawData = {
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
  } catch (error) {
    throw new Error('Failed to save equipment');
  }
} 