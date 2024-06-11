import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(6, "Password should be at least 6 charachters long."),
})

const loginValidator = (data: { email: string; password: string }) => {
    return loginSchema.parse(data)
}

export { loginValidator }
