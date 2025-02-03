'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Modal from '@/components/ui/Modal';
import EquipmentForm from '@/components/forms/EquipmentForm';

export default function EquipmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Equipment</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No equipment found</p>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Equipment"
      >
        <EquipmentForm />
      </Modal>
    </div>
  );
} 