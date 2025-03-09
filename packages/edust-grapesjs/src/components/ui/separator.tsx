"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "eg:bg-border eg:shrink-0 data-[orientation=horizontal]:eg:h-px data-[orientation=horizontal]:eg:w-full data-[orientation=vertical]:eg:h-full data-[orientation=vertical]:eg:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
