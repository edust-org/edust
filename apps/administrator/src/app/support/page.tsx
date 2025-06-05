"use client"

import { AuthGuard } from "@/components"
import { ticketHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { SupportTicketStatus } from "@edust/types"
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  ScrollArea,
} from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { formatDistanceToNow } from "date-fns"
import { EllipsisVertical } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { AssignTo } from "./assign-to"
import { ChangeStatus } from "./change-status"
import { DeleteTicket } from "./delete-ticket"
import { Ticket } from "./ticket"

export default function Support() {
  const searchParams = useSearchParams()
  const ticketId: string | null = searchParams.get("ticketId")

  const { user } = useAuthStore()

  const { data: ticketsData } = ticketHooks.useGetTickets()

  return (
    <AuthGuard requiredPermissions={["adm:support:*"]}>
      <section className="grid h-[calc(100vh-85px)] grid-cols-[300px_auto] gap-4 overflow-hidden">
        <ScrollArea type="scroll" className="min-h-80">
          <div className="flex flex-col gap-2">
            {ticketsData?.data.items.map((ticket) => {
              return (
                <Card
                  key={ticket.id}
                  className={cn(ticketId === ticket.id && "bg-gray-100")}
                >
                  <CardHeader className="flex-row justify-between">
                    <CardTitle className="grow">
                      <Link
                        key={ticket.id}
                        href={
                          ticket.status === SupportTicketStatus.trusted
                            ? "#"
                            : `support/?ticketId=${ticket.id}`
                        }
                        className="inline-block w-full"
                      >
                        {ticket.title}
                      </Link>
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={"sm"}>
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>
                          <ChangeStatus
                            ticketId={ticket.id}
                            status={ticket.status}
                          />
                        </DropdownMenuLabel>

                        {ticket.status !== SupportTicketStatus.trusted && (
                          <DeleteTicket ticketId={ticket.id} />
                        )}

                        {!ticket.assignedToId && (
                          <DropdownMenuLabel>
                            <AssignTo ticketId={ticket.id} />
                          </DropdownMenuLabel>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between gap-4">
                    <Badge
                      className={cn(
                        "me-2",
                        ticket.status === SupportTicketStatus.open &&
                          "bg-blue-600 text-white hover:bg-blue-700",
                        ticket.status === SupportTicketStatus.pending &&
                          "bg-yellow-500 text-black hover:bg-yellow-600",
                        ticket.status === SupportTicketStatus.inProgress &&
                          "bg-indigo-500 text-white hover:bg-indigo-600",
                        ticket.status === SupportTicketStatus.completed &&
                          "bg-emerald-600 text-white hover:bg-emerald-700",
                        ticket.status === SupportTicketStatus.closed &&
                          "bg-gray-500 text-white hover:bg-gray-600",
                        ticket.status === SupportTicketStatus.trusted &&
                          "bg-red-500 text-white hover:bg-red-600",
                      )}
                    >
                      {ticket.status}
                    </Badge>
                    {formatDistanceToNow(new Date(ticket.createdAt), {
                      addSuffix: true,
                    })}
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </ScrollArea>

        <div>
          {user?.id && ticketId && (
            <Ticket myUserId={user.id} ticketId={ticketId} />
          )}
        </div>
      </section>
    </AuthGuard>
  )
}
