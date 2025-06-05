import api from "@/lib/api"
import {
  Message,
  PostMessageBody,
  PostTicketBody,
  Ticket,
} from "@/lib/api/v0/support/support-types"
import { ApiResponse } from "@edust/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const ticketHooks = {
  useGetTickets: () => {
    return useQuery<ApiResponse<{ items: Ticket[] }>>({
      queryKey: ["support", "tickets"],
      queryFn: api.v0.ticket.getTickets,
    })
  },

  usePostTicket: () => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<Ticket>, unknown, PostTicketBody>({
      mutationFn: api.v0.ticket.postTicket,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["support", "tickets"] })
      },
    })
  },

  useGetMessages: (ticketId: string | null) => {
    return useQuery<ApiResponse<{ items: Message[] }>>({
      queryKey: ["support", "messages", ticketId],
      queryFn: () => api.v0.ticket.getMessages(ticketId!),
      enabled: !!ticketId,
    })
  },

  usePostMessage: () => {
    const queryClient = useQueryClient()
    return useMutation<
      ApiResponse<Message>,
      unknown,
      { ticketId: string; body: PostMessageBody }
    >({
      mutationFn: ({ ticketId, body }) =>
        api.v0.ticket.postMessage(ticketId, body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["support", "messages", variables.ticketId],
        })
      },
    })
  },
}
