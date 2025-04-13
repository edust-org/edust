import { PermissionValues } from "@/lib/pm"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { deleteCookie, getCookies } from "cookies-next"

export interface Organization {
  id: string
  name: string
  role: {
    id: string
    name: string
    permissions: PermissionValues[]
  }
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
    setAuthentication(state, action: PayloadAction<Organization[] | null>) {
      state.organizations = action.payload
      if (action.payload && action.payload.length > 0) {
        state.activeOrgId = action.payload[0]?.id || null
      }
    },
    setActiveOrg(state, action: PayloadAction<string>) {
      state.activeOrgId =
        state.organizations?.find((org) => org.id === action.payload)?.id ||
        null
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
