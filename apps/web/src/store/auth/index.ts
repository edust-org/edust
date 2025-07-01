import { defaultValues } from "@/configs"
import { getSocket, socketEvents } from "@/lib/socket"
import { AuthMe, Roles } from "@edust/types"
import { deleteCookie, getCookies } from "cookies-next"
import { Socket } from "socket.io-client"
import { create } from "zustand"

interface AuthState {
  user: AuthMe | null
  setAuthMe: (user: AuthMe | null) => void

  socket: Socket | null
  connectSocket: () => void
  disconnectSocket: () => void
  clearOnlineUsers: () => void
  onlineUsers: Set<string>

  getOrganization: (
    orgUsername: string,
  ) => NonNullable<AuthMe["organizations"]>[number] | null

  setActiveOrg: (orgUsername: string) => void
  getActiveOrg: () => NonNullable<AuthMe["organizations"]>[number] | null
  setActiveOrgId: (orgUsername: string) => void
  activeOrgId: string | null

  getProfile: (
    orgUsername: string | undefined,
  ) => NonNullable<AuthMe["profiles"]>[number] | null

  setActiveProfileOrg: (orgUsername: string) => void
  getActiveProfileOrg: () => NonNullable<AuthMe["profiles"]>[number] | null

  setActiveProfileOrgId: (orgUsername: string) => void
  activeProfileOrgId: string | null

  logOut: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  socket: null,
  onlineUsers: new Set(),

  activeOrgId: null,
  activeProfileOrgId: null,

  // Set the user and manage socket connection
  setAuthMe: (user) => {
    if (!user) {
      set({ user: null, activeOrgId: null, activeProfileOrgId: null })
      get().disconnectSocket()
      return
    }

    set({ user })
    get().connectSocket()
  },

  // get organization
  getOrganization: (orgUsername: string) => {
    const { user } = get()
    if (!user || !user.organizations) return null

    return (
      user.organizations.find((org) => org.orgUsername === orgUsername) || null
    )
  },

  // Set the active organization
  setActiveOrg: (orgUsername) => {
    const user = get().user
    if (!user || !user.organizations) return

    const org = user.organizations.find((o) => o.orgUsername === orgUsername)
    if (org) {
      set({ activeOrgId: org.id })
      get().connectSocket()
    }
  },

  // Get the active organization
  getActiveOrg: () => {
    const { user, activeOrgId } = get()
    if (!user || !activeOrgId || !user.organizations) return null
    return user.organizations.find((org) => org.id === activeOrgId) || null
  },
  // set active org id
  setActiveOrgId: (orgUsername: string) => {
    const { user } = get()
    if (!user || !user.organizations) return

    const org = user.organizations.find((o) => o.orgUsername === orgUsername)
    if (org) {
      set({ activeOrgId: org.id })
    }
  },

  // Get the profile based on orgUsername
  getProfile: (orgUsername) => {
    const { user } = get()
    if (!user || !orgUsername) return null

    return (
      user.profiles?.find(
        (profile) =>
          profile?.organization?.orgUsername === orgUsername &&
          profile.role === Roles.student,
      ) || null
    )
  },

  setActiveProfileOrgId: (orgUsername) => {
    const profile = get().getProfile(orgUsername)
    if (profile && profile.organization?.id) {
      set({ activeProfileOrgId: profile.organization.id })
    }
  },

  // Set active profile org and id
  setActiveProfileOrg: (orgUsername) => {
    const profile = get().getProfile(orgUsername)
    if (profile?.organization?.id) {
      set({ activeProfileOrgId: profile.organization.id })
    }
  },

  // Get the active profile organization
  getActiveProfileOrg: () => {
    const { activeProfileOrgId, user } = get()
    if (!user || !activeProfileOrgId) return null

    return (
      user.profiles?.find(
        (profile) =>
          profile?.organization?.id === activeProfileOrgId &&
          profile.role === Roles.student,
      ) || null
    )
  },

  // Log out: Clear state and cookies
  logOut: () => {
    localStorage.clear()
    const cookies = Object.entries(getCookies() || {})
    cookies.forEach(([key]) => deleteCookie(key))

    set({ user: null, activeOrgId: null, activeProfileOrgId: null })
    get().disconnectSocket()
    get().clearOnlineUsers()
  },

  // Clear online users from state
  clearOnlineUsers: () => set({ onlineUsers: new Set() }),

  // Connect to the socket
  connectSocket: () => {
    const { user, socket } = get()
    if (!user?.id || socket) return // Prevent reconnecting if already connected

    const newSocket = getSocket(defaultValues.backendURL, {
      query: { userId: user.id },
    })

    newSocket.on("connect", () => {
      newSocket.on(socketEvents.user.online, (users: { userId: string }[]) => {
        const onlineUserIds = new Set(users.map((u) => u.userId))
        set({ onlineUsers: onlineUserIds })
      })
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    newSocket.on("connect_error", (err) => {
      console.error("Socket error:", err)
    })

    set({ socket: newSocket })
  },

  // Disconnect the socket
  disconnectSocket: () => {
    const { socket } = get()
    if (socket) {
      socket.disconnect()
      socket.close()
      set({ socket: null })
    }
  },
}))
