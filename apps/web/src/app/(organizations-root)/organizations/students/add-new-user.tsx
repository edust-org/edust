import { AvatarWithStatus } from "@/components"
import {
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
import { studentHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { useDebounceValue } from "usehooks-ts"
import { z } from "zod"

interface AddNewUserProps {
  activeOrgId: string
}

export const AddNewUser: React.FC<AddNewUserProps> = ({ activeOrgId }) => {
  const [search, setSearch] = useDebounceValue("", 500)

  const isEmail = z.string().email().safeParse(search).success

  const { data, isLoading } = studentHooks.useGetStudentUsers(activeOrgId, {
    search: isEmail ? { email: search } : { name: search },
  })

  const postStudent = studentHooks.usePostStudent()
  const onlineUsers = useAuthStore((state) => state.onlineUsers)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

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
            onChange={(e) => handleSearchChange(e)}
            placeholder="Search by name or email"
            className="mb-4"
          />

          <div className="space-y-2">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              data?.data.items?.map((user) => {
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
                      <Button
                        size={"sm"}
                        onClick={() => {
                          postStudent.mutate({
                            orgId: activeOrgId,
                            body: {
                              userIds: [user.id],
                            },
                          })
                        }}
                        disabled={postStudent.isPending}
                      >
                        Make as a student
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
