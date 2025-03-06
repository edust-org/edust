import { cn } from "@/utils"

import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cn(
        "flex h-screen items-center justify-center bg-muted p-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
