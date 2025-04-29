import { AuthGuard } from "@/components"
import { ReduxProvider } from "@/lib/store"
import "@edust/grapesjs/style.css"
import { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Edust | Education Student Teacher",
  description:
    "Edust is a platform for students, teachers, and educational organizations to collaborate and grow.",
  keywords:
    "education, students, teachers, learning, online courses, schools, universities",
  openGraph: {
    title: "Edust | Education Student Teacher",
    description:
      "A platform that connects students, teachers, and institutions for a better learning experience.",
    url: "https://www.edust.org",
    siteName: "Edust",
    type: "website",
    images: [
      {
        url: "https://www.edust.org/images/logo/logo-light.svg",
        width: 1200,
        height: 630,
        alt: "Edust platform overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@edust_official",
    title: "Edust | Education Student Teacher",
    description:
      "A platform for students, teachers, and organizations to enhance learning experiences.",
    images: ["https://www.edust.org/images/logo/logo-light.svg"],
  },
  metadataBase: new URL("https://www.edust.org"),
  alternates: {
    canonical: "https://www.edust.org",
  },
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider>
          <ReactQueryProvider>
            <ReduxProvider>
              <Toaster richColors />
              <AuthGuard>{children}</AuthGuard>
            </ReduxProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
