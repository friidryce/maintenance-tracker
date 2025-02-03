'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function serverSignIn(employeeId: string) {
  if (!employeeId?.trim()) {
    return 'Employee ID is required';
  }

  try {
    await signIn('credentials', { 
      employeeId,
      redirect: true,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
} 

export async function serverSignOut() {
  await signOut({ redirectTo: '/login' });
} 
