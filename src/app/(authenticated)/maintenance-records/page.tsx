'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import MaintenanceForm from '@/components/forms/MaintenanceForm';

export default function MaintenanceRecordsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: Fetch this data from your API
  const equipmentOptions = [
    { id: '1', name: 'Machine 1' },
    { id: '2', name: 'Machine 2' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Maintenance Records</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create Record
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">No maintenance records found</p>
        </div>
      </div>

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