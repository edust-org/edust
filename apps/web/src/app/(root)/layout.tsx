import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"

import { ReactNode } from "react"

interface LayoutHomeProps {
  home: ReactNode
  "home-public": ReactNode
}

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
        url: "https://www.edust.org/og-image.jpg",
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
    images: ["https://www.edust.org/og-image.jpg"],
  },
  metadataBase: new URL("https://www.edust.org"),
  alternates: {
    canonical: "https://www.edust.org",
  },
  robots: "index, follow",
}

export default async function LayoutHome({
  home,
  "home-public": homePublic,
}: LayoutHomeProps) {
  const data = await getServerSession(authOptions)
  const user = data?.user
  return <>{user ? home : homePublic}</>
}
