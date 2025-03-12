import { ReduxProvider } from "@/lib/store"
import "@edust/grapesjs/style.css"
import { Roboto } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import SessionProvider from "./session-provider"

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider>
          <ReduxProvider>
            <Toaster richColors />
            {children}
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
