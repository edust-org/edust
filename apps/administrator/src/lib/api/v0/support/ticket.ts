import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@edust/types"

import {
  Message,
  PatchTicketBody,
  PostMessageBody,
  Ticket,
} from "./support-types"

const baseUrl = `${defaultValues.apiV0AdmURL}/support/tickets`

export const ticket = {
  getTickets: async (): Promise<ApiResponse<{ items: Ticket[] }>> => {
    const response = await axios.get(baseUrl)
    return response.data
  },

  patchTicket: async (
    ticketId: string,
    body: PatchTicketBody,
  ): Promise<ApiResponse<Ticket>> => {
    const response = await axios.patch(`${baseUrl}/${ticketId}`, body)
    return response.data
  },

  getMessages: async (
    ticketId: string,
  ): Promise<ApiResponse<{ items: Message[] }>> => {
    const response = await axios.get(`${baseUrl}/${ticketId}/messages`)
    return response.data
  },

  postMessage: async (
    ticketId: string,
    body: PostMessageBody,
  ): Promise<ApiResponse<Message>> => {
    const response = await axios.post(`${baseUrl}/${ticketId}/messages`, body)
    return response.data
  },
}
