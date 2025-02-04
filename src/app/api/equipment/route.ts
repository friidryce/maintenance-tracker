import { NextRequest, NextResponse } from 'next/server';
import { createEquipment, getAllEquipment, updateEquipment, deleteEquipment } from '@/app/services/equipmentService';
import { equipmentSchema } from '@/schemas/forms';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = equipmentSchema.parse(body);
    const equipment = await createEquipment(validatedData);
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const equipment = await getAllEquipment();
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch equipment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Equipment ID is required' },
        { status: 400 }
      );
    }
    const equipment = await updateEquipment(id, data);
    return NextResponse.json(equipment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update equipment' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Equipment ID is required' },
        { status: 400 }
      );
    }
    await deleteEquipment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete equipment' },
      { status: 400 }
    );
  }
} 