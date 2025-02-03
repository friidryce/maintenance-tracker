import { maintenanceSchema } from '@/schemas/forms';

export async function submitMaintenance(formData: FormData) {
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
    throw new Error(result.error.errors[0].message);
  }

  try {
    // TODO: Save to database
    console.log('Saving maintenance record:', result.data);
  } catch (error) {
    throw new Error('Failed to save maintenance record');
  }
} 