import { AppSidebarProvider } from "@/components"
import { AuthGuard } from "@/components/guards"
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
            <Toaster richColors />
            <AuthGuard>
              <AppSidebarProvider>{children}</AppSidebarProvider>
            </AuthGuard>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
