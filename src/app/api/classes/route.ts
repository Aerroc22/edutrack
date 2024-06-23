import { db } from "@/lib/db"
import { createClassSchema } from "@/lib/schemas/reqSchemas"

function createJoinCode(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let joinCode: string = ""

    for (let i = 0; i < 6; i++) {
        joinCode += alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    return joinCode
}

export async function POST(req: Request) {
    const body = await req.json()

    const { success, data } = createClassSchema.safeParse(body)

    if (!success) {
        return Response.json(
            { message: "Error: invalid form of data" },
            { status: 400 }
        )
    }

    const joinCode = createJoinCode()

    const classExists = await db.class.findFirst({
        include: {
            teachers: {
                where: {
                    id: data.teacherId,
                },
            },
        },
        where: {
            name: data.nameOfClass,
        },
    })

    if (classExists) {
        return Response.json(
            { message: "Class with that name already exists" },
            { status: 400 }
        )
    }

    const createClass = await db.class.create({
        data: {
            name: data.nameOfClass,
            classInviteCode: joinCode,
            description: data.description,
            teachers: {
                connect: { id: data.teacherId },
            },
        },
    })

    return Response.json(createClass, { status: 201 })
}
