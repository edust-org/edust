import { AuthGuard } from "@/components"
import "@edust/grapesjs/style.css"
import "@edust/ui/globals.css"
import { Metadata } from "next"
import { Roboto } from "next/font/google"
import { Toaster } from "sonner"

import ReactQueryProvider from "./react-query-provider"
import SessionProvider from "./session-provider"

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
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
      <body
        className={`${roboto.className} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ReactQueryProvider>
            <Toaster richColors />
            <AuthGuard>{children}</AuthGuard>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
