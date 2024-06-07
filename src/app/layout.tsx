import "@/app/globals.css"

import { Navbar } from "@/components/navbar"
import { ReactQueryProvider } from "@/providers/react-query.provider"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

export const fontSans = FontSans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Next.js + Hono 🔥 + Auth.js 🔒",
    description: "Auth with Next.js, Hono, and Auth.js",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={fontSans.className}>
                <ReactQueryProvider>
                    <section className="flex h-full flex-col">
                        <header className="h-16 border-b">
                            <Navbar />
                        </header>
                        <main className="flex-grow">{children}</main>
                    </section>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
