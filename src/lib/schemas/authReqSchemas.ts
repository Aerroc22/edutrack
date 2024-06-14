import passage from "next-auth/providers/passage"
import { z } from "zod"

const registerSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must contain at least 6 chracters"),
    name: z.string().min(1, "Name field is empty"),
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export { registerSchema, loginSchema }
