import { NextRequest, NextResponse } from 'next/server';
import { createMaintenance, getAllMaintenance, updateMaintenance, deleteMaintenance } from '@/services/maintenanceService';
import { maintenanceSchema } from '@/schemas/forms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = maintenanceSchema.parse(body);
    const maintenance = await createMaintenance(validatedData);
    return NextResponse.json(maintenance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const records = await getAllMaintenance();
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance records' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Maintenance record ID is required' },
        { status: 400 }
      );
    }
    const maintenance = await updateMaintenance(id, data);
    return NextResponse.json(maintenance);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update maintenance record' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Maintenance record ID is required' },
        { status: 400 }
      );
    }
    await deleteMaintenance(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete maintenance record' },
      { status: 400 }
    );
  }
} 