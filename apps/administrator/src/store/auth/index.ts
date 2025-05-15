import { defaultValues } from "@/configs"
import { getSocket, socketEvents } from "@/lib/socket"
import { AuthMe } from "@/types"
import { deleteCookie, getCookies } from "cookies-next"
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

  setAuthMe: (user: AuthMe | null) => void

  logOut: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  socket: null,
  isSocketOrgConnected: false,
  onlineUsers: new Set(),

  setAuthMe: (user) => {
    if (!user) {
      set({ user: null })
      return
    }

    set({
      user,
    })
    get().connectSocket()
  },

  logOut: () => {
    localStorage.clear()
    const cookies = Object.entries(getCookies() || {})
    cookies.forEach(([key]) => deleteCookie(key))

    deleteCookie(ACTIVE_ORG_COOKIE)

    set({ user: null })
    get().disconnectSocket()
    get().clearOnlineUsers()
  },

  clearOnlineUsers: () => set({ onlineUsers: new Set() }),

  connectSocket: () => {
    const user = get().user
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
    set({ socket })
  },

  disconnectSocket: () => {
    const socket = get().socket

    if (socket) {
      socket.disconnect()
      socket.close()
    }

    set({ socket: null })
  },
}))
