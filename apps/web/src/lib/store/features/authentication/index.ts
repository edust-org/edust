import { Roles, User } from "@/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { deleteCookie, getCookies } from "cookies-next"

export interface AuthenticationState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  orgId: string
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  orgId: "",
}

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<AuthenticationState>) {
      state.isAuthenticated = action.payload.isAuthenticated
      state.user = action.payload.user

      const isOwner =
        action.payload.user?.organizationRoles?.filter(
          (item) => item.role === Roles.OWNER,
        ) || []

      if (isOwner[0]) {
        state.orgId = isOwner[0].organization.id
      }
      state.isLoading = action.payload.isLoading
    },
    logOut() {
      localStorage.clear()
      const cookies = Object.entries(getCookies() || {})
      cookies.forEach((c) => deleteCookie(c[0]))
      return initialState
    },
  },
})

export const { setAuthentication, logOut } = authentication.actions

export default authentication.reducer
