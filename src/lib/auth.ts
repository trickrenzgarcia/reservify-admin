import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { adminLogin } from "./firebase/service";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const user = await adminLogin(
          credentials.email as string,
          credentials.password as string
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
      }

      return session;
    },
    async jwt({ token }) {
      return token;
    },
    async authorized({ auth }) {
      return !!auth;
    },
    redirect(params) {
      return "/";
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
