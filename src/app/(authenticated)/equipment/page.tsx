'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import EquipmentForm from '@/components/forms/EquipmentForm';
import { DataTable, equipmentColumns } from '@/components/DataTable';
import { Equipment } from '@/interfaces/data';

// Temporary mock data - replace with actual API call later
const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'CNC Machine',
    location: 'Building A',
    department: 'Machining',
    model: 'CNC-2000',
    serialNumber: 'CN2000-123',
    installDate: new Date('2023-01-15'),
    status: 'Operational',
  },
  {
    id: '2',
    name: 'Packaging Robot',
    location: 'Building B',
    department: 'Packaging',
    model: 'PR-500',
    serialNumber: 'PR500-456',
    installDate: new Date('2023-03-20'),
    status: 'Maintenance',
  },
];

export default function EquipmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    setEquipment(mockEquipment);
  }, []);

  const handleEquipmentAdded = (newEquipment: Equipment) => {
    setEquipment((prev) => [...prev, newEquipment]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <DataTable 
        columns={equipmentColumns} 
        data={equipment} 
        searchKey="name"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Equipment"
      >
        <EquipmentForm 
          onSubmitSuccess={handleEquipmentAdded}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
} 