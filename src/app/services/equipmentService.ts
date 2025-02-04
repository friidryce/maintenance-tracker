'use server';

import { prisma } from '@/lib/db';
import { Equipment, EquipmentCreate, EquipmentUpdate } from '@/types/equipment';

export async function createEquipment(data: EquipmentCreate): Promise<Equipment> {
  try {
    console.log('Creating equipment with data:', JSON.stringify(data, null, 2));
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid equipment data: data must be an object');
    }

    // Ensure all required fields are present
    const requiredFields = ['name', 'location', 'department', 'model', 'serialNumber', 'installDate', 'status'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const equipment = await prisma.equipment.create({
      data: {
        ...data,
        // Ensure installDate is a proper Date object
        installDate: data.installDate instanceof Date ? data.installDate : new Date(data.installDate),
      },
    });
    
    console.log('Equipment created successfully:', JSON.stringify(equipment, null, 2));
    return equipment as Equipment;
  } catch (error) {
    console.error('Error creating equipment:', error);
    throw error;
  }
}

export async function getAllEquipment(): Promise<Equipment[]> {
  return prisma.equipment.findMany() as Promise<Equipment[]>;
}

export async function getEquipmentById(id: string): Promise<Equipment | null> {
  return prisma.equipment.findUnique({
    where: { id },
  }) as Promise<Equipment | null>;
}

export async function updateEquipment(id: string, data: Partial<EquipmentCreate>): Promise<Equipment> {
  return prisma.equipment.update({
    where: { id },
    data,
  }) as Promise<Equipment>;
}

export async function deleteEquipment(id: string): Promise<Equipment> {
  return prisma.equipment.delete({
    where: { id },
  }) as Promise<Equipment>;
} 