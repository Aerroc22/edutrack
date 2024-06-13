import { db } from "@/lib/db"

import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const bruh = await db.bruh.create({
        data: {
            text: "Hello World!",
        },
    })
    console.log(bruh)
    return <div>Hello?</div>
}

export default page
