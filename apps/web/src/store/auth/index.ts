import { defaultValues } from "@/configs"
import { getSocket, socketEvents } from "@/lib/socket"
import { AuthMe } from "@edust/types"
import { deleteCookie, getCookies, setCookie } from "cookies-next"
import { Socket } from "socket.io-client"
import { create } from "zustand"

const ACTIVE_ORG_COOKIE = "activeOrgId"
const ACTIVE_ACADEMY_COOKIE = "activeAcademyId"

interface AuthState {
  user: null | AuthMe
  socket: Socket | null
  socketOrg: Socket | null
  isSocketOrgConnected: boolean
  connectSocket: () => void
  disconnectSocket: () => void
  clearOnlineUsers: () => void
  onlineUsers: Set<string>
  onlineOrgs: Set<string>

  setAuthMe: (user: AuthMe | null) => void

  organizations: AuthMe["organizations"]
  activeOrgId: string | null
  setActiveOrg: (orgId: string) => void

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
  socketOrg: null,
  isSocketOrgConnected: false,
  onlineUsers: new Set(),
  onlineOrgs: new Set(),

  organizations: null,
  activeOrgId: null,

  activeProfileOrgId: null,

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
      organizations: user.organizations,
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

  getActiveOrg: () => {
    const orgs = get().organizations
    const activeOrgId = get().activeOrgId

    if (!orgs || !activeOrgId) return null

    return orgs.find((org) => org.id === activeOrgId) || null
  },

  getProfile: (orgUsername) => {
    const user = get().user
    if (!user || !orgUsername) return null

    const profiles = Array.isArray(user.profiles) ? user.profiles : []
    const foundProfile = profiles.find(
      (profile) =>
        profile &&
        profile.organization &&
        profile.organization.orgUsername === orgUsername,
    )

    return foundProfile || null
  },
  setActiveProfileOrgId: (orgUsername) => {
    const profile = get().getProfile(orgUsername)
    if (profile && profile.organization?.id) {
      set({ activeProfileOrgId: profile.organization.id })
      setCookie(ACTIVE_ACADEMY_COOKIE, profile.organization.id, {
        sameSite: "lax",
      })
    }
  },

  setActiveProfileOrg: (orgUsername) => {
    const profile = get().getProfile(orgUsername)
    if (profile && profile.organization?.id) {
      set({ activeProfileOrgId: profile.organization.id })
    }
  },
  getActiveProfileOrg: () => {
    const activeProfileOrgId = get().activeProfileOrgId
    const user = get().user

    if (!user || !activeProfileOrgId) return null

    const profiles = Array.isArray(user.profiles) ? user.profiles : []
    const foundProfile = profiles.find(
      (profile) =>
        profile &&
        profile.organization &&
        profile.organization.id === activeProfileOrgId,
    )
    return foundProfile || null
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

      socketOrg.on(socketEvents.org.online, (orgs: { orgId: string }[]) => {
        const onlineOrgIds = new Set(orgs.map((o) => o.orgId))
        set({ onlineOrgs: onlineOrgIds })
      })

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
