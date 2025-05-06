import { getSocket, socketEvents } from "@/lib/socket"
import { AuthMe } from "@/types"
import { deleteCookie, getCookies, setCookie } from "cookies-next"
import { Socket } from "socket.io-client"
import { create } from "zustand"

const ACTIVE_ORG_COOKIE = "activeOrgId"

interface AuthState {
  user: null | AuthMe
  socket: Socket | null
  connectSocket: () => void
  disconnectSocket: () => void
  clearOnlineUsers: () => void
  onlineUsers: Set<string>
  organizations: AuthMe["organizations"] | null
  activeOrgId: string | null
  setAuthMe: (user: AuthMe | null) => void
  setActiveOrg: (orgId: string) => void
  logOut: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  socket: null,
  onlineUsers: new Set(),
  organizations: null,
  activeOrgId: null,

  setAuthMe: (user) => {
    if (!user) {
      set({ user: null, organizations: null, activeOrgId: null })
      return
    }

    const existingOrg = user.organizations?.find(
      (org) => org.id === get().activeOrgId,
    )
    const newActiveOrgId = existingOrg
      ? existingOrg.id
      : user?.organizations?.[0]?.id || null

    if (newActiveOrgId) {
      setCookie(ACTIVE_ORG_COOKIE, newActiveOrgId, { sameSite: "lax" })
    }

    set({
      user,
      organizations: user.organizations || null,
      activeOrgId: newActiveOrgId,
    })
    get().connectSocket()
  },

  setActiveOrg: (orgId) => {
    const orgs = get().organizations
    const matchedOrg = orgs?.find((org) => org.id === orgId) || null

    if (matchedOrg) {
      setCookie(ACTIVE_ORG_COOKIE, matchedOrg.id, { sameSite: "lax" })
      set({ activeOrgId: matchedOrg.id })
    }
  },

  logOut: () => {
    localStorage.clear()
    const cookies = Object.entries(getCookies() || {})
    cookies.forEach(([key]) => deleteCookie(key))

    deleteCookie(ACTIVE_ORG_COOKIE)

    set({ user: null, organizations: null, activeOrgId: null })

    get().disconnectSocket()
    get().clearOnlineUsers()
  },

  clearOnlineUsers: () => set({ onlineUsers: new Set() }),
  connectSocket: () => {
    const user = get().user
    const existingSocket = get().socket

    if (!user?.id || existingSocket?.connected) return

    const socket = getSocket({ query: { userId: user.id } })

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
      socket.on(socketEvents.user.online, (users: { userId: string }[]) => {
        const onlineUserIds = new Set(users.map((user) => user.userId))
        set({ onlineUsers: onlineUserIds })
      })
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err)
    })

    set({ socket })
  },
  disconnectSocket: () => {
    const socket = get().socket
    if (socket) {
      socket.disconnect()
      socket.close() // explicitly close and prevent reconnection
      set({ socket: null })
    }
  },
}))
