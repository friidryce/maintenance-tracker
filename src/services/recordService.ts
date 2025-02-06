import { prisma } from '@/lib/db';
import { MaintenanceRecord, MaintenanceCreate } from '@/types/maintenance';
import { Equipment, EquipmentCreate } from '@/types/equipment';
import { Prisma } from '@prisma/client';

type RecordType = 'maintenance' | 'equipment';

type RecordTypeMap = {
  maintenance: {
    output: MaintenanceRecord;
    input: MaintenanceCreate;
  };
  equipment: {
    output: Equipment;
    input: EquipmentCreate;
  };
};

interface ServiceConfig<T extends RecordType> {
  model: any;
  processInput: (data: RecordTypeMap[T]['input']) => any;
  processOutput: (record: any) => RecordTypeMap[T]['output'];
  includeRelations?: { [key: string]: boolean };
}

const services: { [K in RecordType]: ServiceConfig<K> } = {
  maintenance: {
    model: prisma.maintenance_record,
    processInput: (data: MaintenanceCreate) => data,
    processOutput: (record): MaintenanceRecord => ({...record}),
    includeRelations: { equipment: true }
  },
  equipment: {
    model: prisma.equipment,
    processInput: (data: EquipmentCreate) => data,
    processOutput: (record): Equipment => record
  }
};

export async function createRecord<T extends RecordType>(
  type: T,
  data: RecordTypeMap[T]['input']
): Promise<RecordTypeMap[T]['output']> {
  const service = services[type];
  const processedData = service.processInput(data);
  const record = await service.model.create({
    data: processedData,
    ...(service.includeRelations && { include: service.includeRelations })
  });
  return service.processOutput(record);
}

export async function getAllRecords<T extends RecordType>(
  type: T
): Promise<RecordTypeMap[T]['output'][]> {
  const service = services[type];
  const records = await service.model.findMany({
    ...(service.includeRelations && { include: service.includeRelations })
  });
  return records.map(service.processOutput);
}

export async function getRecordById<T extends RecordType>(
  type: T,
  id: string
): Promise<RecordTypeMap[T]['output'] | null> {
  const service = services[type];
  const record = await service.model.findUnique({
    where: { id },
    ...(service.includeRelations && { include: service.includeRelations })
  });
  return record ? service.processOutput(record) : null;
}

export async function updateRecord<T extends RecordType>(
  type: T,
  id: string,
  data: Partial<RecordTypeMap[T]['input']>
): Promise<RecordTypeMap[T]['output']> {
  const service = services[type];
  const processedData = service.processInput(data as RecordTypeMap[T]['input']);
  const record = await service.model.update({
    where: { id },
    data: processedData,
    ...(service.includeRelations && { include: service.includeRelations })
  });
  return service.processOutput(record);
}

export async function deleteRecord<T extends RecordType>(
  type: T,
  id: string
): Promise<RecordTypeMap[T]['output']> {
  const service = services[type];
  const record = await service.model.delete({
    where: { id }
  });
  return service.processOutput(record);
} 