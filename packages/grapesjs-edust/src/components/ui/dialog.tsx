import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "eg-fixed eg-inset-0 eg-z-50 eg-bg-black/80 eg- data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "eg-fixed eg-left-[50%] eg-top-[50%] eg-z-50 eg-grid eg-w-full eg-max-w-lg eg-translate-x-[-50%] eg-translate-y-[-50%] eg-gap-4 eg-border eg-bg-background eg-p-6 eg-shadow-lg eg-duration-200 data-[state=open]:eg-animate-in data-[state=closed]:eg-animate-out data-[state=closed]:eg-fade-out-0 data-[state=open]:eg-fade-in-0 data-[state=closed]:eg-zoom-out-95 data-[state=open]:eg-zoom-in-95 data-[state=closed]:eg-slide-out-to-left-1/2 data-[state=closed]:eg-slide-out-to-top-[48%] data-[state=open]:eg-slide-in-from-left-1/2 data-[state=open]:eg-slide-in-from-top-[48%] sm:eg-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="eg-absolute eg-right-4 eg-top-4 eg-rounded-sm eg-opacity-70 eg-ring-offset-background eg-transition-opacity hover:eg-opacity-100 focus:eg-outline-none focus:eg-ring-2 focus:eg-ring-ring focus:eg-ring-offset-2 disabled:eg-pointer-events-none data-[state=open]:eg-bg-accent data-[state=open]:eg-text-muted-foreground">
        <X className="eg-h-4 eg-w-4" />
        <span className="eg-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "eg-flex eg-flex-col eg-space-y-1.5 eg-text-center sm:eg-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "eg-text-lg eg-font-semibold eg-leading-none eg-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("eg-text-sm eg-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
