import { GlobalTopNotificationBar, Navbar } from "@/components"
import { OrgLists } from "./org-lists"

export const PrivateHome = () => {
  return (
    <>
      <GlobalTopNotificationBar />

      <Navbar />

      <main className="min-h-[calc(100vh-56px)] bg-background pt-4 md:py-8">
        <OrgLists />
      </main>
    </>
  )
}
