import NextAuth from 'next-auth';
import type { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const config = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | null }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Getting session id can only be done in the session callback
        // Otherwise, it will only return the name, email, image
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const employeeId = credentials?.employeeId as string;
        if (!employeeId?.trim()) {
          return null;
        }

        // Add employeeId to the user object
        return {
          id: employeeId,
          name: null,
          email: null,
          image: null
        } as User;
      },
    }),
  ]
};

export const { auth, signIn, signOut } = NextAuth(config); 