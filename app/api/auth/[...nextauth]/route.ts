/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHash } from 'crypto';

import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/app/types/supabase';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const passwordHash = createHash("sha256")
          .update(password)
          .digest("hex");

        const { data, error } = await supabase
          .from("tb_users")
          .select("*")
          .eq("email", email)
          .eq("password", passwordHash);

        if ((!data && error) || (data && data.length === 0)) {
          return null;
        } else {
          return data[0] as any;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.token = token;
      session.user.address = token.address as string;
      session.user.created_at = token.created_at as string;
      session.user.email = token.email as string;
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.phone = token.phone as number;
      return session;
    },
  },
  pages: {
    signIn: "../../auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
