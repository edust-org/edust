import { OrganizationRoles, Roles } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileSwitchState {
  system: Roles;
  organization_roles: OrganizationRoles[] | null;
  activeMode: Roles | OrganizationRoles;
}

const initialState: ProfileSwitchState = {
  system: Roles.GUEST,
  organization_roles: null,
  activeMode: Roles.GUEST,
};

export const profileSwitch = createSlice({
  name: "authProfileSwitch",
  initialState,
  reducers: {
    setProfileMode(state, action: PayloadAction<ProfileSwitchState>) {
      state.activeMode = action.payload.activeMode;
    },

    setProfileActiveMode(
      state,
      action: PayloadAction<Roles | OrganizationRoles>,
    ) {
      state.activeMode = action.payload;
    },
    clearProfileMode() {
      return initialState;
    },
  },
});
