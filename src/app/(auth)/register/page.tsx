"use client"
import Logo from "@/components/ui/Logo"
import { registerSchema } from "@/lib/schemas/authReqSchemas"
import Link from "next/link"
import { FC, FormEvent, useState } from "react"
import { ZodError, z } from "zod"

const typeOfError = ["email", "password", "name"]

type Errors = {
    form?: z.inferFlattenedErrors<typeof registerSchema>
    fetch?: string
}

const page: FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<Errors>({})

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})

        try {
            const validatedFields = registerSchema.safeParse({
                email,
                password,
                name,
            })
            if (validatedFields.success) {
                // Handle submit
                const register = fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(validatedFields.data),
                })
                console.log(register)
            } else {
                setErrors({ form: validatedFields.error.flatten() })
            }
        } catch (error) {}
    }

    return (
        <main className="flex h-screen w-screen items-center justify-end bg-gray-950">
            <div className="flex h-full w-full items-center justify-center bg-white md:w-1/2">
                <div className="flex h-20 w-7/12 flex-col items-center justify-center gap-5 text-xs">
                    <div className="flex w-full items-center justify-center gap-4 text-xl text-slate-900">
                        <Logo className="h-16 w-16" />
                        <div className="block text-center">
                            Register an account <br />
                            at{" "}
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
                            {errors.form?.fieldErrors?.name
                                ? errors.form?.fieldErrors?.name[0]
                                : null}
                        </div>
                        <label
                            htmlFor="email"
                            className="mt-3 block text-xs font-bold text-gray-900"
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
                            {errors?.form?.fieldErrors.email
                                ? errors?.form?.fieldErrors.email[0]
                                : null}
                        </div>
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
                        <div className="text-xs text-rose-800">
                            {(errors?.form?.fieldErrors.password
                                ? errors?.form?.fieldErrors.password[0]
                                : null) ||
                                errors?.form?.formErrors[0] ||
                                errors.fetch}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-4 flex h-11 w-full items-center justify-center rounded-md bg-rose-800 text-sm font-bold text-gray-50 transition hover:bg-rose-700"
                            >
                                Sign up
                            </button>
                            <div className="mt-1 text-xs text-gray-500">
                                Have an account?{" "}
                                <Link href="/login">
                                    <span className="underline-2 font-bold text-rose-800 hover:border-b-rose-600 hover:text-rose-600 hover:underline">
                                        Sign in
                                    </span>
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
