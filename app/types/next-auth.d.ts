import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      token: JWT;
      address: string | null;
      created_at: string | null;
      email: string;
      id: number;
      name: string;
      phone: number | null;
      type: string
      userType: 'client' | 'staff' ;
    };
  }
}