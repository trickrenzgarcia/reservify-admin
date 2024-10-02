import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name: string | null;
    email: string | null;
    picture: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null;
      name: string | null;
      email: string;
      image: string | null;
    };
  }
}
