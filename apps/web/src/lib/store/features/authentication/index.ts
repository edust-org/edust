import { PermissionValues } from "@/lib/pm"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { deleteCookie, getCookies, setCookie } from "cookies-next"

export interface Organization {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  roleId: string
  role: string
  rolePermissions: PermissionValues[]
}

export interface AuthenticationState {
  organizations: null | Organization[]
  activeOrgId: null | string
}

const initialState: AuthenticationState = {
  organizations: null,
  activeOrgId: null,
}

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication(
      state: AuthenticationState,
      action: PayloadAction<Organization[] | null>,
    ) {
      state.organizations =
        action.payload && action.payload.length > 0 ? action.payload : null

      if (action.payload && action.payload.length > 0) {
        const existingOrg = action.payload.find(
          (org) => org.id === state.activeOrgId,
        )
        if (existingOrg) {
          state.activeOrgId = existingOrg.id
        } else {
          state.activeOrgId = action.payload[0]?.id || null
        }
        setCookie("activeOrgId", state.activeOrgId, { sameSite: "lax" })
      }
    },
    setActiveOrg(state: AuthenticationState, action: PayloadAction<string>) {
      state.activeOrgId =
        state.organizations?.find((org) => org.id === action.payload)?.id ||
        null
      setCookie("activeOrgId", state.activeOrgId, { sameSite: "lax" })
    },
    logOut() {
      localStorage.clear()
      const cookies = Object.entries(getCookies() || {})
      cookies.forEach((c) => deleteCookie(c[0]))
      return { ...initialState }
    },
  },
})

export const selectActiveOrg = (authenticationState: AuthenticationState) => {
  return (
    authenticationState.organizations?.find(
      (org) => org.id === authenticationState.activeOrgId,
    ) || null
  )
}

export const { setAuthentication, setActiveOrg, logOut } =
  authentication.actions

export default authentication.reducer
