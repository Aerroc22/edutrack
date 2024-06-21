import { db } from "@/lib/db"
import { registerSchema } from "@/lib/schemas/authReqSchemas"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body)
    const { success, data } = registerSchema.safeParse(body)

    if (!success)
        return Response.json({ message: "Invalid form data" }, { status: 400 })

    const findUser = await db.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (findUser)
        return Response.json(
            { message: "This email is already in use" },
            { status: 409 }
        )

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)

    const user = await db.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    })

    return Response.json({ message: "ok", user }, { status: 200 })
}
