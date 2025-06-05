/* eslint-disable check-file/filename-naming-convention */
import { User as CoreUser } from "@edust/types"
import { DefaultSession, User as DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User
    extends DefaultUser,
      Omit<CoreUser, "createdAt" | "updatedAt"> {
    id: string
    accessToken: string
    refreshToken: string
    expiresAt: string
  }

  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      expiresAt: string
    } & DefaultSession["user"] &
      Omit<CoreUser, "createdAt" | "updatedAt">
    accessToken: string
    refreshToken: string
    expiresAt: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Omit<CoreUser, "createdAt" | "updatedAt"> {
    id: string
    name: string
    email: string
    accessToken: string
    refreshToken: string
    expiresAt: string
  }
}
