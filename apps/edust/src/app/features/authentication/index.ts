import { Roles, User } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthenticationState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  orgId: string
  auth: {
    token: string
    expiresAt: Date
  }
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  orgId: "",
  auth: {
    token: "",
    expiresAt: new Date(),
  },
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
      state.orgId = isOwner.length > 0 ? isOwner[0].role : ""

      state.auth = action.payload.auth
      state.isLoading = action.payload.isLoading
    },
    signOut() {
      localStorage.clear()
      return initialState
    },
  },
})

export const { setAuthentication, signOut } = authentication.actions

export default authentication.reducer
