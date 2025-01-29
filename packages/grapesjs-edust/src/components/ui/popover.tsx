import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "eg-z-50 eg-w-72 eg-rounded-md eg-border eg-bg-popover eg-p-4 eg-text-popover-foreground eg-shadow-md eg-outline-none data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0 data-[state=closed]:eg-zoom-out-95 data-[state=open]:eg-zoom-in-95 data-[side=bottom]:eg-slide-in-from-top-2 data-[side=left]:eg-slide-in-from-right-2 data-[side=right]:eg-slide-in-from-left-2 data-[side=top]:eg-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
