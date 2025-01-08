"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "eg-z-50 eg-overflow-hidden eg-rounded-md eg-bg-primary eg-px-3 eg-py-1.5 eg-text-xs eg-text-primary-foreground eg-animate-in eg-fade-in-0 eg-zoom-in-95 data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=closed]:eg-zoom-out-95 data-[side=bottom]:eg-slide-in-from-top-2 data-[side=left]:eg-slide-in-from-right-2 data-[side=right]:eg-slide-in-from-left-2 data-[side=top]:eg-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
