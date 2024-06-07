"use client"

import { signIn } from "@hono/auth-js/react"
import { useTransition } from "react"

export default function Page() {
    const onClick = async () => {
        await signIn("google", { callbackUrl: "/protected" })
    }

    return (
        <div className="flex h-full items-center justify-center">
            <button
                onClick={onClick}
                className="rounded-md border px-4 py-1.5 text-sm font-medium">
                Sign In With Google
            </button>
        </div>
    )
}
