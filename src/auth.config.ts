import { db } from "@/server/db"
import Google from "@auth/core/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { type AuthConfig } from "@hono/auth-js"
import { type Context } from "hono"
import { env } from "hono/adapter"

export function getAuthConfig(c: Context): AuthConfig {
    const { AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } = env<{
        AUTH_SECRET: string
        AUTH_GOOGLE_ID: string
        AUTH_GOOGLE_SECRET: string
    }>(c as never)

    return {
        adapter: DrizzleAdapter(db),
        secret: AUTH_SECRET,
        providers: [
            Google({
                clientId: AUTH_GOOGLE_ID,
                clientSecret: AUTH_GOOGLE_SECRET,
            }),
        ],
        callbacks: {
            session({ session }) {
                return session
            },
        },
        pages: { signIn: "/sign-in" },
    }
}
