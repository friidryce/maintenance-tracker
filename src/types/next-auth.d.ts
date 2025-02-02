import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      employeeId: string;
    } & DefaultSession['user'];
  }

  interface User {
    employeeId: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    employeeId?: string;
  }
} 