import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "eg-inline-flex eg-h-9 eg-items-center eg-justify-center eg-rounded-lg eg-bg-muted eg-p-1 eg-text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "eg-inline-flex eg-items-center eg-justify-center eg-whitespace-nowrap eg-rounded-md eg-px-3 eg-py-1 eg-text-sm eg-font-medium eg-ring-offset-background eg-transition-all focus-visible:eg-outline-none focus-visible:eg-ring-2 focus-visible:eg-ring-ring focus-visible:eg-ring-offset-2 disabled:eg-pointer-events-none disabled:eg-opacity-50 data-[state=active]:eg-bg-background data-[state=active]:eg-text-foreground data-[state=active]:eg-shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "eg-mt-2 eg-ring-offset-background focus-visible:eg-outline-none focus-visible:eg-ring-2 focus-visible:eg-ring-ring focus-visible:eg-ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
