"use client"

import {
  useEditNotificationsAsRead,
  useGetUserNotifications,
} from "@/hooks/react-query"
import { Status } from "@edust/types"
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { Bell, Check } from "lucide-react"

import { NotificationItems } from "./notification-items"

export const Notification = () => {
  const { data } = useGetUserNotifications({
    filter: { status: Status.unread },
  })

  const { mutate, isPending } = useEditNotificationsAsRead()

  const handleMakeAsARead = async () => {
    mutate({ markAllAsRead: true })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Badge
            className="absolute -right-2 -top-2 rounded-full px-2 py-0.5"
            variant={"destructive"}
          >
            {data?.pagination?.totalRecords || 0}
          </Badge>
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("grid w-[380px] gap-4 p-6")}>
        <div>
          <Typography variant="h4">Notifications</Typography>
          <Typography affects="removePaddingMargin">
            You have {data?.pagination?.totalRecords || 0} unread messages.
          </Typography>
        </div>
        {/* <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-muted-foreground text-sm">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div> */}
        <NotificationItems />
        <Button
          className="w-full"
          onClick={handleMakeAsARead}
          disabled={isPending || data?.pagination?.totalRecords === 0}
        >
          <Check /> Mark all as read
        </Button>
      </PopoverContent>
    </Popover>
  )
}
