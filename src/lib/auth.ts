import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import Credentials from "next-auth/providers/credentials";

export async function verifyPassword(password: string, hash: string) {
  const bcrypt = await import("bcrypt");
  return bcrypt.compare(hash, password);
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials
        // Must be on firestore database.
        // You can also use the verifyPassword function above
        // Retrieve user from firestore and check if the email exists to the credentials.email
        // if user exists, check if the password is correct.
        // if password is correct, return the user object

        // otherwise, return null like below
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        // session.user.isVerified = token.isVerified;
        // session.user.gender = token.gender;
        // etc.....
        // if you have type errors just add the missing properties to the Session interface in src/types/next-auth.d.ts
      }
      console.log("session", session);
      return session;
    },
    async jwt({ token }) {
      // TODO: Add custom claims to token
      // fetch user from firestore where doc.id === token.sub and add to token
      // const user = <from firestore function logic>
      // return { ...token, isVerified: user.isVerified, gender: user.gender }
      // if you have type errors just add the missing properties to the JWT interface in src/types/next-auth.d.ts
      return token;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
