"use server"

import { z } from "zod"

import { loginSchema } from "@/lib/schemas/authReqSchemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (loginObject: z.infer<typeof loginSchema>) => {
    const validatedFields = loginSchema.safeParse(loginObject)

    if (!validatedFields.success) return { error: "Invalid Fields!" }
    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Invalid credentials!" }
        }
        throw error // Some sort of pattern that would prevent the nav from redirecting for some reason
    }
}
