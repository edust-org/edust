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

export interface PostTicketBody {
  title: string
  message: string
  imageUrls?: string[]
  imageDetails?: CloudinaryUploadResponse[] | null
}

export interface PostMessageBody {
  message?: string
  imageUrls?: string[]
  imageDetails?: CloudinaryUploadResponse[] | null
}
