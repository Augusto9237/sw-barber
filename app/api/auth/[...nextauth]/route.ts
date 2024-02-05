import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [GoogleProvider({
        clientId: "703229671135-32gvk9vnqf2r85m1t3tdk4t5r053940p.apps.googleusercontent.com",
        clientSecret: "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"
    })]
});

export { handler as GET, handler as POST };