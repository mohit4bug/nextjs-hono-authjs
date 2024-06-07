import { getAuthConfig } from "@/auth.config"
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js"
import { Hono } from "hono"
import { handle } from "hono/vercel"

// Change if using nodejs only compatible code
export const runtime = "edge"

const app = new Hono().basePath("/api")

// Using shared config (middleware & route handler)
app.use("*", initAuthConfig(getAuthConfig))

app.use("/auth/*", authHandler())

app.use("/*", verifyAuth())

app.get("/data", (c) => {
    return c.json(c.get("authUser").session)
})

export const GET = handle(app)
export const POST = handle(app)
