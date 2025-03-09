import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("eg:relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="eg:ring-ring/10 dark:eg:ring-ring/20 dark:eg:outline-ring/40 eg:outline-ring/50 eg:size-full eg:rounded-[inherit] eg:transition-[color,box-shadow] focus-visible:eg:ring-4 focus-visible:eg:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "eg:flex eg:touch-none eg:p-px eg:transition-colors eg:select-none",
        orientation === "vertical" &&
          "eg:h-full eg:w-2.5 eg:border-l eg:border-l-transparent",
        orientation === "horizontal" &&
          "eg:h-2.5 eg:flex-col eg:border-t eg:border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="eg:bg-border eg:relative eg:flex-1 eg:rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
