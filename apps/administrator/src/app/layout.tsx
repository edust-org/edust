import { AppSidebarProvider } from "@/components"
import { ReduxProvider } from "@/lib/store"
import { Roboto } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import ReactQueryProvider from "./react-query-provider"
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
          <ReactQueryProvider>
            <ReduxProvider>
              <Toaster richColors />
              <AppSidebarProvider>{children}</AppSidebarProvider>
            </ReduxProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
