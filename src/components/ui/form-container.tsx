'use client';

import { cn } from "@/lib/utils";

interface FormContainerProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export function FormContainer({ children, className, ...props }: FormContainerProps) {
  return (
    <form {...props} className={cn("space-y-4", className)}>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
          </p>
        </div>
      </div>
      {children}
    </form>
  );
}

export function FormField({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>;
}

export function FormDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

export function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
      <span className="text-red-500 ml-1" aria-label="required">*</span>
    </label>
  );
} 