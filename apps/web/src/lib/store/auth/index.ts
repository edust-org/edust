import { PermissionValues } from "@/lib/pm"
import { deleteCookie, getCookies, setCookie } from "cookies-next"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Organization {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  roleId: string
  role: string
  rolePermissions: PermissionValues[]
}

interface AuthState {
  organizations: Organization[] | null
  activeOrgId: string | null
  setAuthentication: (orgs: Organization[] | null) => void
  setActiveOrg: (orgId: string) => void
  logOut: () => void
  selectActiveOrg: () => Organization | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      organizations: null,
      activeOrgId: null,

      setAuthentication: (orgs) => {
        if (!orgs || orgs.length === 0) {
          set({ organizations: null, activeOrgId: null })
          return
        }

        const currentActiveOrgId = get().activeOrgId
        const existingOrg = orgs.find((org) => org.id === currentActiveOrgId)
        const newActiveOrgId = existingOrg
          ? existingOrg.id
          : orgs[0]?.id || null

        if (newActiveOrgId) {
          setCookie("activeOrgId", newActiveOrgId, { sameSite: "lax" })
        }

        set({
          organizations: orgs,
          activeOrgId: newActiveOrgId,
        })
      },

      setActiveOrg: (orgId) => {
        const orgs = get().organizations
        const matchedOrg = orgs?.find((org) => org.id === orgId) || null

        const newOrgId = matchedOrg?.id || null
        if (newOrgId) {
          setCookie("activeOrgId", newOrgId, { sameSite: "lax" })
        }

        set({ activeOrgId: newOrgId })
      },

      logOut: () => {
        localStorage.clear()
        const cookies = Object.entries(getCookies() || {})
        cookies.forEach(([key]) => deleteCookie(key))

        set({ organizations: null, activeOrgId: null })
      },

      selectActiveOrg: () => {
        const { organizations, activeOrgId } = get()
        return organizations?.find((org) => org.id === activeOrgId) || null
      },
    }),
    {
      name: "auth-storage", // storage key
      partialize: (state) => ({
        organizations: state.organizations,
        activeOrgId: state.activeOrgId,
      }),
    },
  ),
)
