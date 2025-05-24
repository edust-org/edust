import { AvatarWithStatus } from "@/components"
import { supportHooks, ticketHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuLabel,
  Input,
  Typography,
} from "@edust/ui"
import { useDebounceValue } from "usehooks-ts"
import { z } from "zod"

type AssignToPros = {
  ticketId: string
}

export const AssignTo: React.FC<AssignToPros> = ({ ticketId }) => {
  const [search, setSearch] = useDebounceValue("", 500)

  const isEmail = z.string().email().safeParse(search).success

  const { data, isLoading } = supportHooks.useGetSupportUsers({
    search: isEmail ? { email: search } : { name: search },
  })

  const assignTo = ticketHooks.usePatchTicket()
  const onlineUsers = useAuthStore((state) => state.onlineUsers)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuLabel className="p-0">Assign To</DropdownMenuLabel>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign To</DialogTitle>
          <DialogDescription>Assign to new user</DialogDescription>
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
                <div className="space-y-4 rounded-lg border p-4" key={user.id}>
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
                        assignTo.mutate({
                          ticketId,
                          body: {
                            assignedToId: user.id,
                          },
                        })
                      }}
                      disabled={assignTo.isPending}
                    >
                      Make as a assign
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
