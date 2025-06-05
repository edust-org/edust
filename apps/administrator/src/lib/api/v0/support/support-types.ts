import { CloudinaryUploadResponse, SupportTicketStatus } from "@edust/types"

export interface Ticket {
  id: string
  title: string
  status: SupportTicketStatus
  createdById: string
  assignedToId?: string
  createdAt: string
  updatedAt: string
}

export interface PatchTicketBody {
  status?: SupportTicketStatus
  assignedToId?: string
}

export interface Message {
  id: string
  message?: string
  imageUrls?: string[]
  createdAt: string
  updatedAt: string
  seenAt?: string | null
  sender: {
    id: string
    name: string
    profilePic: string | null
  }
}

export interface PostMessageBody {
  message?: string
  imageUrls?: string[]
  imageDetails?: CloudinaryUploadResponse[] | null
}

export type SupportUserQuery = {
  search?: {
    name?: string
    email?: string
  }
}

export type SupportUser = {
  id: string
  name: string
  profilePic: string | null
  roles: {
    id: string
    name: string
  }[]
}
