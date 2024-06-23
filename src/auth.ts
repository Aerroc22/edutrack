import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            // Passing the updated information from the token to the session
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token }) {
            // DB requests to update the JWT user token go here
            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    jwt: {},
    ...authConfig,
})
