'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import MaintenanceForm from '@/components/forms/MaintenanceForm';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function MaintenanceRecordsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Fetch this data from your API
  const equipmentOptions = [
    { id: '1', name: 'Machine 1' },
    { id: '2', name: 'Machine 2' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Maintenance Records
        </h1>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Record
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            No maintenance records found
          </p>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Maintenance Record"
      >
        <MaintenanceForm equipmentOptions={equipmentOptions} />
      </Modal>
    </div>
  );
} 