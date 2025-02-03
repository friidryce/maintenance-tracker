import { useState } from 'react';

type ValidationResult = { [key: string]: string | undefined };

interface UseFormProps<T> {
  initialData?: Partial<T>;
  onSubmit: (data: T) => void;
  validate: (data: Partial<T>) => ValidationResult;
}

export function useForm<T>({ initialData, onSubmit, validate }: UseFormProps<T>) {
  const [formData, setFormData] = useState<T>({ ...initialData } as T);
  const [errors, setErrors] = useState<ValidationResult>({});

  const handleChange = (name: keyof T, value: any) => {
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData
  };
} 