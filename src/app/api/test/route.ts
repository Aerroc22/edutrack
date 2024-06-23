import { db } from "@/lib/db"

export async function GET(request: Request) {
    // const createClass = await db.class.create({
    //     data: {
    //         name: "English",
    //         classInviteCode: "ABCDEF",
    //     },
    // })

    // const linkIvanAndEnglish = await db.class.update({
    //     where: {
    //         classInviteCode: "ABCDEF",
    //     },
    //     data: {
    //         students: {
    //             connect: { id: "666c761c3a7d8a21ded02e6c" },
    //         },
    //     },
    // })

    const findClass = await db.class.findUnique({
        where: {
            classInviteCode: "ABCDEF",
        },
        include: {
            students: {
                select: {
                    id: true,
                    name: true,
                },
            },
            teachers: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    })

    console.log(findClass)

    return Response.json(findClass)
}
