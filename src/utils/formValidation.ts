import { z } from 'zod';
import { equipmentSchema, maintenanceSchema } from '@/schemas/forms';

export type ValidationResult = { [key: string]: string | undefined };

function formatZodError(error: z.ZodError): ValidationResult {
  const errors: ValidationResult = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });
  return errors;
}

export function validateEquipmentForm(data: unknown): ValidationResult {
  try {
    equipmentSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodError(error);
    }
    return { form: 'Invalid form data' };
  }
}

export function validateMaintenanceForm(data: unknown): ValidationResult {
  try {
    maintenanceSchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return formatZodError(error);
    }
    return { form: 'Invalid form data' };
  }
}

export function hasErrors(errors: ValidationResult): boolean {
  return Object.keys(errors).length > 0;
}