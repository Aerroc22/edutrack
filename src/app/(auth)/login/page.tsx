import Logo from "@/components/ui/Logo"
import { FC } from "react"

const page: FC = () => {
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

                    <form className="w-full">
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
                        />
                        <label
                            htmlFor="password"
                            className="mt-4 block text-xs font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            type="text"
                            className="mt-1 h-10 w-full rounded-lg border-2 border-gray-300 text-xs"
                            placeholder="Password"
                        />
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
