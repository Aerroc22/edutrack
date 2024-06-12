"use client"
import Logo from "@/components/ui/Logo"
import { FC, FormEvent, useState } from "react"
import { ZodError, z } from "zod"

type typeOfError = "email" | "password" | "other"

interface Error {
    emailErr?: string
    nameErr?: string
    passwordErr?: string
    unknownErr?: string
}

const page: FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<Error>({})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const validatedInput = {
                name: z.string().min(1).safeParse(name),
                email: z.string().email().safeParse(email),
                password: z.string().min(6).safeParse(password),
            }

            const success =
                validatedInput.name.success &&
                validatedInput.email.success &&
                validatedInput.password.success

            let newErrors: Error = {}

            if (!success) {
                if (!validatedInput.name.success) {
                    newErrors = { nameErr: "Please enter your full name" }
                }
                if (!validatedInput.email.success) {
                    newErrors = { ...newErrors, emailErr: "Invalid email" }
                }
                if (!validatedInput.password.success) {
                    newErrors = {
                        ...newErrors,
                        passwordErr:
                            "Password must be longer than six charachters",
                    }
                }
            } else {
                // Handle submit
            }

            setErrors(newErrors)
        } catch (error) {
            setErrors({
                ...errors,
                unknownErr: "Unknown error has occured",
            })
        }
    }

    return (
        <main className="flex h-screen w-screen items-center justify-end bg-gray-950">
            <div className="flex h-full w-full items-center justify-center bg-white md:w-1/2">
                <div className="flex h-20 w-7/12 flex-col items-center justify-center gap-5 text-xs">
                    <div className="flex w-full items-center justify-center gap-4 text-xl text-slate-900">
                        <Logo className="h-16 w-16" />
                        <div className="block text-center">
                            Welcome to <br></br>
                            <span className="font-bold text-rose-800">
                                Edutrack!
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <label
                            htmlFor="email"
                            className="block text-xs font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-1 h-10 min-w-full rounded-lg border-2 border-gray-300 text-xs"
                            placeholder="Full name"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <div className="text-xs text-rose-800">
                            {errors?.nameErr}
                        </div>
                        <label
                            htmlFor="email"
                            className="mt-3 block text-xs font-medium text-gray-900"
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
                            className="mt-3 block text-xs font-medium text-gray-900"
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
                                className="mt-4 flex h-11 w-full items-center justify-center rounded-md bg-rose-800 text-xs font-semibold text-gray-50 transition hover:bg-rose-700"
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
