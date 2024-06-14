"use client"
import Logo from "@/components/ui/Logo"
import { login } from "@/lib/actions/login"
import { AuthError } from "next-auth"
import Link from "next/link"
import { FC, FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"

const page: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            const response = await login({ email, password })

            if (response?.error) {
                setError(response.error)
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex h-screen w-screen items-center justify-end bg-gray-950">
            <div className="flex h-full w-full items-center justify-center bg-white md:w-1/2">
                <div className="flex h-20 w-7/12 flex-col items-center justify-center gap-5 text-xs">
                    <div className="flex w-full items-center justify-center gap-4 text-xl text-slate-900">
                        <Logo className="h-16 w-16" />
                        <div className="block text-center">
                            Welcome back to <br></br>
                            <span className="font-bold text-rose-800">
                                Edutrack!
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <label
                            htmlFor="email"
                            className="block text-xs font-bold text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            className="mt-1 h-10 min-w-full rounded-lg border-2 border-gray-300 text-xs"
                            placeholder="Email@email.com"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <label
                            htmlFor="password"
                            className="mt-3 block text-xs font-bold text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 h-10 w-full rounded-lg border-2 border-gray-300 text-xs"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="mt-1 text-rose-700">{error}</div>
                        <div>
                            <button
                                type="submit"
                                className="mt-4 flex h-11 w-full items-center justify-center rounded-md bg-rose-700 text-sm font-semibold text-gray-50 transition hover:bg-rose-600"
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                ) : null}{" "}
                                Sign in
                            </button>
                            <div className="mt-1 text-xs text-gray-500">
                                Don't have an account?{" "}
                                <Link href={"/register"}>
                                    <span className="underline-2 font-bold text-rose-800 hover:border-b-rose-600 hover:text-rose-600 hover:underline">
                                        Sign up
                                    </span>{" "}
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default page
