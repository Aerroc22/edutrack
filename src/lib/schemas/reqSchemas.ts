import { z } from "zod"

const createClassSchema = z.object({
    nameOfClass: z.string().min(1),
    teacherId: z.string().min(1),
    description: z.string().min(1).optional(),
})

export { createClassSchema }
