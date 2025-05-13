import { AvatarWithStatus } from "@/components"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Typography,
} from "@/components/ui"
import { accessControlHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { toast } from "sonner"

import React from "react"

import { AddNewUser } from "./add-new-user"

export const UserLists = ({
  roleId,
  roleName,
}: {
  roleId: string
  roleName: string
}) => {
  const state = useAuthStore()

  const onlineUsers = useAuthStore((state) => state.onlineUsers)

  const { data, isLoading } = accessControlHooks.useGetRoleUsers(
    state.activeOrgId,
    roleId,
  )

  const removeUserRole = accessControlHooks.useDeleteRoleAssignmentById()

  const handleRemove = (userId: string, assignId: string) => {
    if (state.activeOrgId) {
      removeUserRole
        .mutateAsync({ orgId: state.activeOrgId, userId, assignId })
        .then((value) => {
          if (value.status === "SUCCESS") {
            toast.success("User removed successfully")
          }
        })
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Typography variant="h3">User Lists</Typography>
        {state.activeOrgId && (
          <AddNewUser
            activeOrgId={state.activeOrgId}
            roleId={roleId}
            roleName={roleName}
          />
        )}
      </div>

      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>See the list of users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading &&
            Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="space-y-2 rounded-lg border p-3 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <Skeleton className="h-8 w-36" />
                  <Skeleton className="w-18 h-6" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}

          {data?.data.items.map((user) => {
            return (
              <div
                key={user.id}
                className="space-y-2 rounded-lg border p-3 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <AvatarWithStatus
                    src={user.profilePic}
                    alt={user.name}
                    status={onlineUsers.has(user.id) ? "online" : "offline"}
                  />
                  <Typography variant="h4">{user.name}</Typography>
                  <Badge>{user.roleName}</Badge>
                </div>
                <Button
                  variant={"destructive"}
                  onClick={() => handleRemove(user.id, user.assignId)}
                  disabled={removeUserRole.isPending}
                >
                  Remove
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
