import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "eg-fixed eg-inset-0 eg-z-50 eg-bg-black/80 eg- data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "eg-fixed eg-z-50 eg-gap-4 eg-bg-background eg-p-6 eg-shadow-lg eg-transition eg-ease-in-out data-[state=closed]:eg-duration-300 data-[state=open]:eg-duration-500 data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out",
  {
    variants: {
      side: {
        top: "eg-inset-x-0 eg-top-0 eg-border-b data-[state=closed]:eg-slide-out-to-top data-[state=open]:eg-slide-in-from-top",
        bottom:
          "eg-inset-x-0 eg-bottom-0 eg-border-t data-[state=closed]:eg-slide-out-to-bottom data-[state=open]:eg-slide-in-from-bottom",
        left: "eg-inset-y-0 eg-left-0 eg-h-full eg-w-3/4 eg-border-r data-[state=closed]:eg-slide-out-to-left data-[state=open]:eg-slide-in-from-left sm:eg-max-w-sm",
        right:
          "eg-inset-y-0 eg-right-0 eg-h-full eg-w-3/4 eg-border-l data-[state=closed]:eg-slide-out-to-right data-[state=open]:eg-slide-in-from-right sm:eg-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="eg-absolute eg-right-4 eg-top-4 eg-rounded-sm eg-opacity-70 eg-ring-offset-background eg-transition-opacity hover:eg-opacity-100 focus:eg-outline-none focus:eg-ring-2 focus:eg-ring-ring focus:eg-ring-offset-2 disabled:eg-pointer-events-none data-[state=open]:eg-bg-secondary">
        <X className="eg-h-4 eg-w-4" />
        <span className="eg-sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "eg-flex eg-flex-col eg-space-y-2 eg-text-center sm:eg-text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "eg-flex eg-flex-col-reverse sm:eg-flex-row sm:eg-justify-end sm:eg-space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("eg-text-lg eg-font-semibold eg-text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("eg-text-sm eg-text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
