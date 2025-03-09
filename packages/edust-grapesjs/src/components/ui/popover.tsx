import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "eg:bg-popover eg:text-popover-foreground data-[state=open]:eg:animate-in data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=open]:eg:fade-in-0 data-[state=closed]:eg:zoom-out-95 data-[state=open]:eg:zoom-in-95 data-[side=bottom]:eg:slide-in-from-top-2 data-[side=left]:eg:slide-in-from-right-2 data-[side=right]:eg:slide-in-from-left-2 data-[side=top]:eg:slide-in-from-bottom-2 eg:z-50 eg:w-72 eg:rounded-md eg:border eg:p-4 eg:shadow-md eg:outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
