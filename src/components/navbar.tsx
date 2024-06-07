"use client"

import { useSession } from "@/hooks/useSession"
import { signOut } from "@hono/auth-js/react"
import Link from "next/link"

export const Navbar = () => {
    const onClick = async () => {
        await signOut()
    }

    const { session } = useSession()

    return (
        <nav className="flex h-full items-center justify-between px-8">
            <menu className="flex items-center gap-x-8">
                <Link href="/">Home (Public)</Link>
                <Link href="/protected">Protected (Client)</Link>
                {!session && <Link href="/sign-in">Sign In</Link>}
            </menu>
            {session && (
                <button
                    onClick={onClick}
                    className="rounded-md border px-4 py-1.5 text-sm font-medium">
                    Sign Out
                </button>
            )}
        </nav>
    )
}
