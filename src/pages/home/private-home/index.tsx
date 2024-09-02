import { Navbar } from "@/components";
import { lazy } from "react";

const OrgLists = lazy(() =>
  import("./org-lists").then((module) => ({
    default: module.OrgLists,
  })),
);

export const PrivateHome = () => {
  return (
    <>
      <Navbar.Private />

      <main className="h-screen bg-slate-50 pt-4 md:pt-8">
        <OrgLists />
      </main>
    </>
  );
};
