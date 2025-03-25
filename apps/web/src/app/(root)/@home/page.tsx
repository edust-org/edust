"use client"

import { GlobalTopNotificationBar, Navbar } from "@/components"

import { OrgLists } from "./components/org-lists"

export default function Home() {
  return (
    <>
      <title>Welcome to Edust</title>
      <GlobalTopNotificationBar />

      <Navbar />

      <main className="bg-background min-h-[calc(100vh-56px)] pt-4 md:py-8">
        <OrgLists />
      </main>
    </>
  )
}
