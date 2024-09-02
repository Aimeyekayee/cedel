import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

import type { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "1001234",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id.toString(),
            name: `${user.Firstname} ${user.Lastname}`,
            email: user.email,
            username: user.username, // Add username to the returned user object
            user_uuid: user.user_uuid,
            role: user.role,
          };
        } else {
          throw new Error("Invalid username or password");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.username = user.username as string; // Store username in the token
        token.user_uuid = user.user_uuid;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.username = token.username as string; // Add username to the session
        session.user.user_uuid = token.user_uuid as string; // Add username to the session
        session.user.role = token.role
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
