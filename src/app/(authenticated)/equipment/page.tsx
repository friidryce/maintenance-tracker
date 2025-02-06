import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import EquipmentForm from '@/components/forms/EquipmentForm';
import { DataTable } from '@/components/DataTable';
import { equipmentColumns } from '@/components/table/columns';
import { getRecords } from '@/app/actions/records';
import { Equipment } from '@/types/equipment';


export default async function EquipmentPage() {
  const equipment = await getRecords('equipment') as Equipment[];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Equipment</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
              <DialogDescription>
                Fill out the form below to add new equipment to the system.
              </DialogDescription>
            </DialogHeader>
            <EquipmentForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={equipmentColumns} data={equipment} />
    </div>
  );
} 