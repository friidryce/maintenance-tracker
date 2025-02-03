'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function serverSignIn(employeeId: string) {
  try {
    await signIn('credentials', { 
      employeeId,
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