import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "eg-group/sidebar-wrapper eg-flex eg-min-h-svh eg-w-full has-[[data-variant=inset]]:eg-bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "eg-flex eg-h-full eg-w-[--sidebar-width] eg-flex-col eg-bg-sidebar eg-text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="eg-w-[--sidebar-width] eg-bg-sidebar eg-p-0 eg-text-sidebar-foreground [&>button]:eg-hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="eg-flex eg-h-full eg-w-full eg-flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="eg-group eg-peer eg-hidden md:eg-block eg-text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "eg-duration-200 eg-relative eg-h-svh eg-w-[--sidebar-width] eg-bg-transparent eg-transition-[width] eg-ease-linear",
            "group-data-[collapsible=offcanvas]:eg-w-0",
            "group-data-[side=right]:eg-rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:eg-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:eg-w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "eg-duration-200 eg-fixed eg-inset-y-0 eg-z-10 eg-hidden eg-h-svh eg-w-[--sidebar-width] eg-transition-[left,right,width] eg-ease-linear md:eg-flex",
            side === "left"
              ? "eg-left-0 group-data-[collapsible=offcanvas]:eg-left-[calc(var(--sidebar-width)*-1)]"
              : "eg-right-0 group-data-[collapsible=offcanvas]:eg-right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "eg-p-2 group-data-[collapsible=icon]:eg-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:eg-w-[--sidebar-width-icon] group-data-[side=left]:eg-border-r group-data-[side=right]:eg-border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="eg-flex eg-h-full eg-w-full eg-flex-col eg-bg-sidebar group-data-[variant=floating]:eg-rounded-lg group-data-[variant=floating]:eg-border group-data-[variant=floating]:eg-border-sidebar-border group-data-[variant=floating]:eg-shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("eg-h-7 eg-w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="eg-sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "eg-absolute eg-inset-y-0 eg-z-20 eg-hidden eg-w-4 eg--translate-x-1/2 eg-transition-all eg-ease-linear after:eg-absolute after:eg-inset-y-0 after:eg-left-1/2 after:eg-w-[2px] hover:after:eg-bg-sidebar-border group-data-[side=left]:eg--right-4 group-data-[side=right]:eg-left-0 sm:eg-flex",
        "[[data-side=left]_&]:eg-cursor-w-resize [[data-side=right]_&]:eg-cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:eg-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:eg-cursor-w-resize",
        "group-data-[collapsible=offcanvas]:eg-translate-x-0 group-data-[collapsible=offcanvas]:after:eg-left-full group-data-[collapsible=offcanvas]:hover:eg-bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:eg--right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:eg--left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "eg-relative eg-flex eg-min-h-svh eg-flex-1 eg-flex-col eg-bg-background",
        "peer-data-[variant=inset]:eg-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:eg-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:eg-ml-2 md:peer-data-[variant=inset]:eg-ml-0 md:peer-data-[variant=inset]:eg-rounded-xl md:peer-data-[variant=inset]:eg-shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "eg-h-8 eg-w-full eg-bg-background eg-shadow-none focus-visible:eg-ring-2 focus-visible:eg-ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("eg-flex eg-flex-col eg-gap-2 eg-p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("eg-flex eg-flex-col eg-gap-2 eg-p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("eg-mx-2 eg-w-auto eg-bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "eg-flex eg-min-h-0 eg-flex-1 eg-flex-col eg-gap-2 eg-overflow-auto group-data-[collapsible=icon]:eg-overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("eg-relative eg-flex eg-w-full eg-min-w-0 eg-flex-col eg-p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "eg-duration-200 eg-flex eg-h-8 eg-shrink-0 eg-items-center eg-rounded-md eg-px-2 eg-text-xs eg-font-medium eg-text-sidebar-foreground/70 eg-outline-none eg-ring-sidebar-ring eg-transition-[margin,opa] eg-ease-linear focus-visible:eg-ring-2 [&>svg]:eg-size-4 [&>svg]:eg-shrink-0",
        "group-data-[collapsible=icon]:eg--mt-8 group-data-[collapsible=icon]:eg-opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "eg-absolute eg-right-3 eg-top-3.5 eg-flex eg-aspect-square eg-w-5 eg-items-center eg-justify-center eg-rounded-md eg-p-0 eg-text-sidebar-foreground eg-outline-none eg-ring-sidebar-ring eg-transition-transform hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground focus-visible:eg-ring-2 [&>svg]:eg-size-4 [&>svg]:eg-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:eg-absolute after:eg--inset-2 after:md:eg-hidden",
        "group-data-[collapsible=icon]:eg-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("eg-w-full eg-text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("eg-flex eg-w-full eg-min-w-0 eg-flex-col eg-gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("eg-group/menu-item eg-relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "eg-peer/menu-button eg-flex eg-w-full eg-items-center eg-gap-2 eg-overflow-hidden eg-rounded-md eg-p-2 eg-text-left eg-text-sm eg-outline-none eg-ring-sidebar-ring eg-transition-[width,height,padding] hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground focus-visible:eg-ring-2 active:eg-bg-sidebar-accent active:eg-text-sidebar-accent-foreground disabled:eg-pointer-events-none disabled:eg-opacity-50 eg-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:eg-pointer-events-none aria-disabled:eg-opacity-50 data-[active=true]:eg-bg-sidebar-accent data-[active=true]:eg-font-medium data-[active=true]:eg-text-sidebar-accent-foreground data-[state=open]:hover:eg-bg-sidebar-accent data-[state=open]:hover:eg-text-sidebar-accent-foreground group-data-[collapsible=icon]:eg-!size-8 group-data-[collapsible=icon]:eg-!p-2 [&>span:last-child]:eg-truncate [&>svg]:eg-size-4 [&>svg]:eg-shrink-0",
  {
    variants: {
      variant: {
        default: "hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground",
        outline:
          "eg-bg-background eg-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground hover:eg-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "eg-h-8 eg-text-sm",
        sm: "eg-h-7 eg-text-xs",
        lg: "eg-h-12 eg-text-sm group-data-[collapsible=icon]:eg-!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "eg-absolute eg-right-1 eg-top-1.5 eg-flex eg-aspect-square eg-w-5 eg-items-center eg-justify-center eg-rounded-md eg-p-0 eg-text-sidebar-foreground eg-outline-none eg-ring-sidebar-ring eg-transition-transform hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground focus-visible:eg-ring-2 eg-peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:eg-size-4 [&>svg]:eg-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:eg-absolute after:eg--inset-2 after:md:eg-hidden",
        "eg-peer-data-[size=sm]/menu-button:top-1",
        "eg-peer-data-[size=default]/menu-button:top-1.5",
        "eg-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:eg-hidden",
        showOnHover &&
          "eg-group-focus-within/menu-item:opacity-100 eg-group-hover/menu-item:opacity-100 data-[state=open]:eg-opacity-100 eg-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:eg-opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "eg-absolute eg-right-1 eg-flex eg-h-5 eg-min-w-5 eg-items-center eg-justify-center eg-rounded-md eg-px-1 eg-text-xs eg-font-medium eg-tabular-nums eg-text-sidebar-foreground eg-select-none eg-pointer-events-none",
      "eg-peer-hover/menu-button:text-sidebar-accent-foreground eg-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "eg-peer-data-[size=sm]/menu-button:top-1",
      "eg-peer-data-[size=default]/menu-button:top-1.5",
      "eg-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:eg-hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("eg-rounded-md eg-h-8 eg-flex eg-gap-2 eg-px-2 eg-items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="eg-size-4 eg-rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="eg-h-4 eg-flex-1 eg-max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "eg-mx-3.5 eg-flex eg-min-w-0 eg-translate-x-px eg-flex-col eg-gap-1 eg-border-l eg-border-sidebar-border eg-px-2.5 eg-py-0.5",
      "group-data-[collapsible=icon]:eg-hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "eg-flex eg-h-7 eg-min-w-0 eg--translate-x-px eg-items-center eg-gap-2 eg-overflow-hidden eg-rounded-md eg-px-2 eg-text-sidebar-foreground eg-outline-none eg-ring-sidebar-ring hover:eg-bg-sidebar-accent hover:eg-text-sidebar-accent-foreground focus-visible:eg-ring-2 active:eg-bg-sidebar-accent active:eg-text-sidebar-accent-foreground disabled:eg-pointer-events-none disabled:eg-opacity-50 aria-disabled:eg-pointer-events-none aria-disabled:eg-opacity-50 [&>span:last-child]:eg-truncate [&>svg]:eg-size-4 [&>svg]:eg-shrink-0 [&>svg]:eg-text-sidebar-accent-foreground",
        "data-[active=true]:eg-bg-sidebar-accent data-[active=true]:eg-text-sidebar-accent-foreground",
        size === "sm" && "eg-text-xs",
        size === "md" && "eg-text-sm",
        "group-data-[collapsible=icon]:eg-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
