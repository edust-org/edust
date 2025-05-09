import { defaultValues } from "@/configs"
import { getSocket, socketEvents } from "@/lib/socket"
import { AuthMe } from "@/types"
import { deleteCookie, getCookies, setCookie } from "cookies-next"
import { Socket } from "socket.io-client"
import { create } from "zustand"

const ACTIVE_ORG_COOKIE = "activeOrgId"

interface AuthState {
  user: null | AuthMe
  socket: Socket | null
  socketOrg: Socket | null
  isSocketOrgConnected: boolean
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
  socketOrg: null,
  isSocketOrgConnected: false,
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
    const previousOrgId = get().activeOrgId
    const socketOrg = get().socketOrg

    const matchedOrg = orgs?.find((org) => org.id === orgId)
    if (!matchedOrg) return

    setCookie(ACTIVE_ORG_COOKIE, matchedOrg.id, { sameSite: "lax" })
    set({ activeOrgId: matchedOrg.id })

    if (socketOrg?.connected && previousOrgId) {
      socketOrg.emit("leaveRoom", previousOrgId)
      socketOrg.emit("joinRoom", matchedOrg.id)
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
    const activeOrgId = get().activeOrgId

    if (!user?.id || get().socket) return

    // Connect to default socket
    const socket = getSocket(defaultValues.backendURL, {
      query: { userId: user.id },
    })

    socket.on("connect", () => {
      socket.on(socketEvents.user.online, (users: { userId: string }[]) => {
        const onlineUserIds = new Set(users.map((u) => u.userId))
        set({ onlineUsers: onlineUserIds })
      })
    })

    socket.on("disconnect", () => {
      console.log("Default socket disconnected")
    })

    socket.on("connect_error", (err) => {
      console.error("Default socket error:", err)
    })
    if (!activeOrgId) {
      return set({ socket, socketOrg: null })
    }

    // Connect to org namespace
    const socketOrg = getSocket(`${defaultValues.backendURL}/org`, {
      query: {
        userId: user.id,
        activeOrgId,
      },
      forceNew: true,
    })

    socketOrg.on("connect", () => {
      socketOrg.emit("joinRoom", activeOrgId)
      set({ isSocketOrgConnected: true })
    })

    socketOrg.on("disconnect", () => {
      socketOrg.emit("leaveRoom", `org-${activeOrgId}`)
      set({ isSocketOrgConnected: false })
      console.log("Org socket disconnected")
    })

    socketOrg.on("connect_error", (err) => {
      set({ isSocketOrgConnected: false })
      console.error("Org socket error:", err)
    })

    set({ socket, socketOrg })
  },

  disconnectSocket: () => {
    const socket = get().socket
    const socketOrg = get().socketOrg

    if (socket) {
      socket.disconnect()
      socket.close()
    }

    if (socketOrg) {
      socketOrg.disconnect()
      socketOrg.close()
    }

    set({ socket: null, socketOrg: null })
  },
}))
