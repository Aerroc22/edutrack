"use client"
import Logo from "@/components/ui/Logo"
import { loginValidator } from "@/lib/validators/auth"
import { FC, FormEvent, useState } from "react"
import { ZodError } from "zod"

type typeOfError = "email" | "password" | "other"

interface Error {
    emailErr?: string
    passwordErr?: string
    unknownErr?: string
}

const page: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<Error>({})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})

        try {
            const parsedLogin = loginValidator({ email, password })
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.forEach((err) => {
                    if (err.path[0] === "email") {
                        setErrors({ ...errors, emailErr: err.message })
                    }
                    if (err.path[0] === "password") {
                        setErrors({ ...errors, passwordErr: err.message })
                    }
                })
            } else {
                setErrors({
                    ...errors,
                    unknownErr: "Unknown error has occured",
                })
            }
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
                            className="block text-xs font-medium leading-6 text-gray-900"
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
                        <div className="text-xs text-rose-800">
                            {errors?.emailErr}
                        </div>
                        <label
                            htmlFor="password"
                            className="mt-4 block text-xs font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 h-10 w-full rounded-lg border-2 border-gray-300 text-xs"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-xs text-rose-800">
                            {errors?.passwordErr || errors?.unknownErr}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-rose-800 text-xs font-semibold text-gray-50 transition hover:bg-rose-700"
                            >
                                Sign in
                            </button>
                            <div className="mt-1 text-xs text-gray-500">
                                Don't have an account?{" "}
                                <span className="underline-2 font-bold text-rose-800 hover:border-b-rose-600 hover:text-rose-600 hover:underline">
                                    Sign up
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default page
