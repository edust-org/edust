import { ReactNode } from "react"
import { cn } from "@/utils"

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
