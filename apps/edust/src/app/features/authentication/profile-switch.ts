import { OrganizationRoles, Roles } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProfileSwitchState {
  systemRole: Roles | null
  organizationRoles: OrganizationRoles[] | null
  activeMode: Roles | OrganizationRoles
}

const initialState: ProfileSwitchState = {
  systemRole: null,
  organizationRoles: null,
  activeMode: Roles.GUEST,
}

export const profileSwitch = createSlice({
  name: "authProfileSwitch",
  initialState,
  reducers: {
    setProfileMode(state, action: PayloadAction<ProfileSwitchState>) {
      state.systemRole = action.payload.systemRole

      const organizationRoles = action.payload.organizationRoles?.map(
        (role: any) => {
          return {
            id: role.id,
            role: role.role,
            organization: role.organization,
          }
        },
      )

      state.organizationRoles = organizationRoles || state.organizationRoles

      state.activeMode = action.payload.activeMode
    },

    setProfileActiveMode(
      state,
      action: PayloadAction<Roles | OrganizationRoles>,
    ) {
      state.activeMode = action.payload
    },
    clearProfileMode() {
      return initialState
    },
  },
})
