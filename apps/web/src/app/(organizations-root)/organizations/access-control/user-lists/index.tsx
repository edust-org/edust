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
import { useAuthStore } from "@/lib/store"

import React from "react"

import { AddNewUser } from "./add-new-user"
import { useGetUsersWithRole } from "./use-get-users-with-role"
import { useRemoveUser } from "./use-remove-user"

export const UserLists = ({
  roleId,
  roleName,
}: {
  roleId: string
  roleName: string
}) => {
  const state = useAuthStore()
  const { data, isLoading } = useGetUsersWithRole(state.activeOrgId, roleId)

  const removeUserRole = useRemoveUser(state.activeOrgId)

  const handleRemove = (userId: string, assignId: string) => {
    removeUserRole.mutate({ userId, assignId })
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

          {data?.map((user) => (
            <div
              key={user.id}
              className="space-y-2 rounded-lg border p-3 shadow-sm"
            >
              <div className="flex items-start gap-2">
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
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
