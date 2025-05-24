import { cn } from "@edust/ui/utils"

import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cn(
        "bg-muted flex h-screen items-center justify-center p-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
