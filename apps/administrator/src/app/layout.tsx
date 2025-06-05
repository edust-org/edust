import { AppSidebarProvider } from "@/components"
import { AuthGuard } from "@/components/guards"
import "@edust/ui/globals.css"
import { Roboto } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner"

import ReactQueryProvider from "./react-query-provider"
import SessionProvider from "./session-provider"

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased`}
        suppressHydrationWarning
      >
        <NextTopLoader color="#171717" showSpinner={false} />
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
