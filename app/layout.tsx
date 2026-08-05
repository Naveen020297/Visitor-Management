import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./styles/main.scss"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded shadow-md z-50">
          Skip to main content
        </a>
        <main id="main" tabIndex="-1" role="main">
          {children}
        </main>
      </body>
    </html>
  )
}