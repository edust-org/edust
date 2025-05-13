import { AvatarWithStatus } from "@/components"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Typography,
} from "@/components/ui"
import { accessControlHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { toast } from "sonner"
import { useDebounceValue } from "usehooks-ts"
import { z } from "zod"

export const AddNewUser = ({
  activeOrgId,
  roleId,
  roleName,
}: {
  activeOrgId: string
  roleId: string
  roleName: string
}) => {
  const [search, setSearch] = useDebounceValue("", 500)

  const isEmail = z.string().email().safeParse(search).success

  const { data, isLoading } = accessControlHooks.useGetAccessControlUsers(
    activeOrgId,
    {
      search: isEmail ? { email: search } : { name: search },
    },
  )

  // const { data, isLoading } = useGetUsers(activeOrgId, search)

  const assignRole = accessControlHooks.usePostRoleAssignments()

  const onlineUsers = useAuthStore((state) => state.onlineUsers)
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new user</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
            <DialogDescription>
              Search and assign the role in a user
            </DialogDescription>
          </DialogHeader>

          <Input
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            placeholder="Search by name or email"
            className="mb-4"
          />

          <div className="space-y-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              data?.data.items.map((user) => {
                const isOnline = onlineUsers.has(user.id)
                return (
                  <div
                    className="space-y-4 rounded-lg border p-4"
                    key={user.id}
                  >
                    <div className="flex items-center gap-2">
                      <AvatarWithStatus
                        src={user.profilePic}
                        alt={user.name}
                        status={isOnline ? "online" : "offline"}
                      />
                      <Typography variant="h4" className="mb-1">
                        {user.name}
                      </Typography>
                    </div>
                    <div>
                      {user.roles?.map((r) => (
                        <Badge key={r.id} className="me-1">
                          {r.name}
                        </Badge>
                      ))}
                    </div>

                    <div>
                      <Button
                        size={"sm"}
                        onClick={() => {
                          assignRole
                            .mutateAsync({
                              orgId: activeOrgId,
                              body: {
                                userId: user.id,
                                roleId: roleId,
                              },
                            })
                            .then((value) => {
                              if (value.status === "SUCCESS") {
                                toast.success("User added successfully")
                              }
                            })
                        }}
                        disabled={
                          assignRole.isPending ||
                          user.roles?.some((r) => r.id === roleId)
                        }
                      >
                        Make as a {roleName}
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
