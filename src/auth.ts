import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

type Credentials = {
  employeeId: string;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        employeeId: { label: "Employee ID", type: "text" }
      },
      async authorize(credentials): Promise<null | { id: string; employeeId: string; name: string | null; email: string | null; }> {
        if (!credentials?.employeeId) return null;

        const employeeId = credentials.employeeId as string;

        // TODO: Add validation against a database
        return {
          id: employeeId,
          employeeId: employeeId,
          name: null,
          email: null
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.employeeId = user.employeeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.employeeId = token.employeeId as string;
      }
      return session;
    },
  },
}); 