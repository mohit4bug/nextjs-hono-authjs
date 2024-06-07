import { getAuthConfig } from "@/auth.config"
import { getAuthUser, initAuthConfig } from "@hono/auth-js"
import { Hono } from "hono"
import { handle } from "hono/vercel"
import { NextResponse } from "next/server"

const app = new Hono()

// Using shared config (middleware & route handler)
app.use("*", initAuthConfig(getAuthConfig))

app.all("*", async (c) => {
    const authUser = await getAuthUser(c)

    const pathname = new URL(c.req.url).pathname
    const isAuthenticated = !!authUser?.session

    const isApiAuthRoute = pathname.startsWith("/api/auth")
    const isPublicRoute = ["/"].includes(pathname)
    const isAuthRoute = ["/sign-in"].includes(pathname)

    if (isApiAuthRoute) return NextResponse.next()

    if (isAuthRoute) {
        if (isAuthenticated) {
            return Response.redirect(new URL("/protected", c.req.url))
        }
        return NextResponse.next()
    }

    if (!isAuthenticated && !isPublicRoute) {
        return Response.redirect(new URL("/sign-in", c.req.url))
    }

    return NextResponse.next()
})

export default handle(app)

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
