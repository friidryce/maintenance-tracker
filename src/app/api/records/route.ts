import { NextRequest, NextResponse } from 'next/server';
import { createRecord, getAllRecords, updateRecord, deleteRecord } from '@/services/recordService';
import { maintenanceSchema, equipmentSchema } from '@/schemas/forms';
import { z } from 'zod';

const recordTypeSchema = z.enum(['maintenance', 'equipment']);
type RecordType = z.infer<typeof recordTypeSchema>;

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    const validatedType = recordTypeSchema.parse(type);
    const schema = validatedType === 'maintenance' ? maintenanceSchema : equipmentSchema;
    const validatedData = schema.parse(data);
    
    const record = await createRecord(validatedType, validatedData);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request data' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');
    const validatedType = recordTypeSchema.parse(type);
    
    const records = await getAllRecords(validatedType);
    return NextResponse.json(records);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch records' },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { type, id, data } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const validatedType = recordTypeSchema.parse(type);
    const schema = validatedType === 'maintenance' ? maintenanceSchema : equipmentSchema;
    const validatedData = schema.parse(data);

    const record = await updateRecord(validatedType, id, validatedData);
    return NextResponse.json(record);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update record' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { type, id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const validatedType = recordTypeSchema.parse(type);
    await deleteRecord(validatedType, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete record' },
      { status: 400 }
    );
  }
}