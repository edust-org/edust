import { defaultValues } from "@/configs"
import Script from "next/script"

import notFoundData from "./not-found-data.json"

export const metadata = {
  title: "View Organization Site - Edust",
  description:
    "Explore the tailored web presence of educational institutions on Edust. View detailed information, updates, and more.",
  keywords: [
    "organization site",
    "Edust",
    "educational institutions",
    "customized web presence",
    "updates",
    "information",
  ],
  author: "Edust",
  openGraph: {
    title: "View Organization Site - Edust",
    description:
      "Explore the tailored web presence of educational institutions on Edust. View detailed information, updates, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "View Organization Site - Edust",
    description:
      "Explore the tailored web presence of educational institutions on Edust. View detailed information, updates, and more.",
  },
}

export default async function SitePage({
  params,
  searchParams,
}: {
  params: Promise<{ orgUsername: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { orgUsername } = await params
  const pageName = (await searchParams).pageName

  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/organizations/orgUsername-${orgUsername}/site${pageName ? `?pageName=${pageName}` : "?pageName=home"}`,
  )

  const site = await response.json()

  const html = site.data?.items[0].html || notFoundData.html
  const css = site.data?.items[0].css || notFoundData.css

  return (
    <main>
      <Script
        src="https://unpkg.com/@tailwindcss/browser@4"
        strategy="lazyOnload"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
