"use client"

import { useSession } from "@/hooks/useSession"

export default function Page() {
    const { session } = useSession()

    if (!session) return null

    return (
        <div className="flex h-full items-center justify-center">
            <code className="rounded-md border p-4">
                <pre>{JSON.stringify(session, null, 4)}</pre>
            </code>
        </div>
    )
}
