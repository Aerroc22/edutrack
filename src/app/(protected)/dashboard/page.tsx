import { auth, signOut } from "@/auth"

import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
    const session = await auth()
    return (
        <>
            <div>{JSON.stringify(session)}</div>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign out</button>
            </form>
        </>
    )
}

export default page
