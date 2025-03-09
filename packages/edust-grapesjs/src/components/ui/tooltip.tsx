"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "eg:bg-primary eg:text-primary-foreground eg:animate-in eg:fade-in-0 eg:zoom-in-95 data-[state=closed]:eg:animate-out data-[state=closed]:eg:fade-out-0 data-[state=closed]:eg:zoom-out-95 data-[side=bottom]:eg:slide-in-from-top-2 data-[side=left]:eg:slide-in-from-right-2 data-[side=right]:eg:slide-in-from-left-2 data-[side=top]:eg:slide-in-from-bottom-2 eg:z-50 eg:w-fit eg:rounded-md eg:px-3 eg:py-1.5 eg:text-xs eg:text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="eg:bg-primary eg:fill-primary eg:z-50 eg:size-2.5 eg:translate-y-[calc(-50%_-_2px)] eg:rotate-45 eg:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
