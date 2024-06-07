import { type AdapterSession, type AdapterUser } from "@auth/core/adapters"
import { useQuery } from "@tanstack/react-query"

/**
 * You can also use `SessionProvider` instead of react-query.
 * @see https://github.com/honojs/middleware/tree/main/packages/auth-js
 */
export const useSession = () => {
    const { data, status } = useQuery({
        queryKey: ["@AUTH_SESSION"],
        queryFn: async () => {
            const res = await fetch("/api/auth/session", { cache: "no-store" })
            return (await res.json()) as { user: AdapterUser } & AdapterSession
        },
        staleTime: Infinity,
    })
    return { session: data, status }
}
