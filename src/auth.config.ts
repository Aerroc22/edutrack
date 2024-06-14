import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin, type NextAuthConfig } from "next-auth"

import { loginSchema } from "@/lib/schemas/authReqSchemas"
import { getUserByEmail } from "./lib/data/user"
import bcrypt from "bcryptjs"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data

                    const user = await getUserByEmail(email)
                    if (!user) {
                        return null
                    }

                    const comparePasswords = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (comparePasswords) return user
                }

                return null
            },
        }),
    ],
} satisfies NextAuthConfig
