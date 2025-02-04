import { useState } from 'react';

export type ValidationResult = { [key: string]: string | undefined };

interface UseFormProps<T> {
  initialData?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  validate?: (data: Partial<T>) => ValidationResult;
}

interface UseFormReturn<T> {
  formData: T;
  errors: ValidationResult;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
}

export function useForm<T>({ 
  initialData, 
  onSubmit, 
  validate 
}: UseFormProps<T>): UseFormReturn<T> {
  const [formData, setFormData] = useState<T>({ ...initialData } as T);
  const [errors, setErrors] = useState<ValidationResult>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setFormData({ ...initialData } as T);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: 'An unexpected error occurred' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
    reset
  };
} 