import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MaintenanceForm from '@/components/forms/MaintenanceForm';
import { DataTable } from '@/components/DataTable';
import { maintenanceColumns } from '@/components/table/columns';
import { getRecords } from '@/app/actions/records';
import { Equipment } from '@/types/equipment';
import { MaintenanceRecord } from '@/types/maintenance';

export default async function MaintenanceRecordsPage() {
  const [records, all_equipment] = await Promise.all([
    getRecords('maintenance') as Promise<MaintenanceRecord[]>,
    getRecords('equipment') as Promise<Equipment[]>
  ]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Maintenance Records</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Maintenance Record</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new maintenance record.
              </DialogDescription>
            </DialogHeader>
            <MaintenanceForm equipment={all_equipment} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={maintenanceColumns} data={records} />
    </div>
  );
} 