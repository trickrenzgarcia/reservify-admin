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
    async redirect({ url, baseUrl }) {
      // Redirect to /admin by default after login
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/admin`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
