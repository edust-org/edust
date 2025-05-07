"use client"

import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from "@/components/ui"
import {
  useEditNotificationsAsRead,
  useGetUserNotifications,
} from "@/hooks/react-query"
import { socketEvents } from "@/lib/socket"
import { useAuthStore } from "@/store"
import { Status } from "@/types"
import { cn } from "@/utils"
import { Bell, Check } from "lucide-react"

import { useEffect, useState } from "react"

import { NotificationItems } from "./notification-items"

export const Notification = () => {
  const socket = useAuthStore((state) => state.socket)

  const { data: notificationData, isLoading } = useGetUserNotifications()
  const { data } = useGetUserNotifications({
    filter: { status: Status.unread },
  })

  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState([])

  const { mutate, isPending } = useEditNotificationsAsRead()

  const handleMakeAsARead = async () => {
    mutate({ markAllAsRead: true })
  }

  useEffect(() => {
    if (!socket) return

    const handleUserRoleAssigned = (data) => {
      if (!data) return
      setNotificationCount((prev) => prev + 1)
      setNotifications((prev) => {
        return [data, ...prev]
      })
    }

    socket.on(socketEvents.notification.new, handleUserRoleAssigned)

    return () => {
      socket.off(socketEvents.notification.new, handleUserRoleAssigned)
    }
  }, [socket])

  useEffect(() => {
    setNotificationCount(data?.pagination?.totalRecords)
    setNotifications(notificationData?.data?.items || [])
  }, [data?.pagination?.totalRecords, notificationData, setNotifications])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Badge
            className="absolute -right-2 -top-2 rounded-full px-2 py-0.5"
            variant={"destructive"}
          >
            {notificationCount}
          </Badge>
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("grid w-[380px] gap-4 p-6")}>
        <div>
          <Typography variant="h4">Notifications</Typography>
          <Typography affects="removePaddingMargin">
            You have {notificationCount} unread messages.
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
        <NotificationItems
          setNotifications={setNotifications}
          notifications={notifications}
          isLoading={isLoading}
        />
        <Button
          className="w-full"
          onClick={handleMakeAsARead}
          disabled={isPending || notificationCount === 0}
        >
          <Check /> Mark all as read
        </Button>
      </PopoverContent>
    </Popover>
  )
}
