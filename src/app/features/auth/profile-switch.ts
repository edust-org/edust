import { OrganizationRoles, Role } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileSwitchState {
  system: Role;
  organization_roles: OrganizationRoles[] | null;
  activeMode: Role | OrganizationRoles;
}

const initialState: ProfileSwitchState = {
  system: Role.GUEST,
  organization_roles: null,
  activeMode: Role.GUEST,
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
      action: PayloadAction<Role | OrganizationRoles>,
    ) {
      state.activeMode = action.payload;
    },
    clearProfileMode() {
      return initialState;
    },
  },
});
