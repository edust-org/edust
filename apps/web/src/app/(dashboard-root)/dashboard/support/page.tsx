"use client"

import { ticketHooks } from "@/hooks/react-query"
import { SupportTicketStatus } from "@/types"
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  SidebarContent,
  Typography,
} from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default function Support() {
  const { data } = ticketHooks.useGetTickets()

  return (
    <>
      <SidebarContent>
        <Typography variant="h2">Support & Tickets</Typography>

        <Card className="my-8 w-fit">
          <CardHeader>
            <CardTitle>Create and View Your Tickets</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href={"support/tickets/create"}>
              <Button>Create New Ticket</Button>
            </Link>
          </CardFooter>
        </Card>

        <section>
          <Typography variant="h3" className="mb-4">
            List of Tickets
          </Typography>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data?.data.items?.map((ticket) => {
              const isTrusted = ticket.status === SupportTicketStatus.trusted
              return (
                <Link
                  key={ticket.id}
                  href={isTrusted ? "#" : `support/tickets/${ticket.id}`}
                  className={cn(isTrusted && "cursor-not-allowed")}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{ticket.title}</CardTitle>
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
                </Link>
              )
            })}
          </div>
        </section>
      </SidebarContent>
    </>
  )
}
