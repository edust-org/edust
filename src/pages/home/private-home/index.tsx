import { GlobalTopNotificationBar, Navbar } from "@/components";
import { lazy } from "react";

const OrgLists = lazy(() =>
  import("./org-lists").then((module) => ({
    default: module.OrgLists,
  })),
);

export const PrivateHome = () => {
  return (
    <>
      <GlobalTopNotificationBar />

      <Navbar.Private />

      <main className="min-h-[calc(100vh-56px)] bg-background pt-4 md:py-8">
        <OrgLists />
      </main>
    </>
  );
};
