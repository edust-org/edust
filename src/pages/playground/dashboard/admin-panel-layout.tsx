"use client";

import { cn } from "@/utils";
import { Sidebar } from "./sidebar";

export default function AdminPanelLayout({
  children,
  isOpen,
  toggleIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  toggleIsOpen: () => void;
}) {
  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>
    </>
  );
}
