"use client"

import { Button, Typography } from "@/components/ui"
import {
  useEditNotificationsAsRead,
  useGetUserNotifications,
} from "@/hooks/react-query"
import { Status } from "@/types"
import { cn } from "@/utils"
import { formatDistanceToNow } from "date-fns"

import React from "react"

export const NotificationItems = () => {
  const { data, isLoading } = useGetUserNotifications()

  const { mutate, isPending } = useEditNotificationsAsRead()
  if (isLoading) {
    return <Typography>Loading...</Typography>
  }
  return (
    <>
      <div>
        {data?.data?.items.map((notification, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span
              className={cn(
                "flex h-2 w-2 translate-y-1 rounded-full",
                notification.status == Status.unread && "bg-primary",
              )}
            />
            <div className="space-y-1">
              <Typography
                affects="removePaddingMargin"
                className="text-sm font-medium leading-none"
              >
                {notification.title}
              </Typography>
              <Typography
                affects="removePaddingMargin"
                className="text-muted-foreground text-sm"
              >
                {notification.description}
              </Typography>
              <div className="flex items-center justify-between gap-4">
                <Typography affects="removePaddingMargin" className="text-xs">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </Typography>
                {notification.status === Status.unread && (
                  <Button
                    size={"sm"}
                    className="text-xs"
                    variant={"ghost"}
                    disabled={isPending}
                    onClick={() => {
                      mutate({ userNotificationIds: [notification.id] })
                    }}
                  >
                    Make read
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
