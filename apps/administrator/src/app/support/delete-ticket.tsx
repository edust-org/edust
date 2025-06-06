import { ticketHooks } from "@/hooks/react-query"
import { SupportTicketStatus } from "@edust/types"
import { DropdownMenuLabel } from "@edust/ui"
import { toast } from "sonner"

type DeleteTicketProps = {
  ticketId: string
}

export const DeleteTicket: React.FC<DeleteTicketProps> = ({ ticketId }) => {
  const changeStatus = ticketHooks.usePatchTicket()
  return (
    <DropdownMenuLabel
      onClick={() => {
        changeStatus
          .mutateAsync({
            ticketId,
            body: {
              status: SupportTicketStatus.trusted,
            },
          })
          .then((response) => {
            if (response.status === "SUCCESS") {
              toast.success(response.message)
            }
          })
      }}
    >
      Delete
    </DropdownMenuLabel>
  )
}
