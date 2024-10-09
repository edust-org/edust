import { UserMode } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrganizationAccess {
  system?: string;
  has_organization?: boolean;
  org_id?: string;
  org_role?: string;
}
export interface ProfileSwitchState {
  activeMode: UserMode | OrganizationAccess;
}

const initialState: ProfileSwitchState = {
  activeMode: UserMode.GUEST,
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
      action: PayloadAction<UserMode | OrganizationAccess>,
    ) {
      state.activeMode = action.payload;
    },
    clearProfileMode() {
      return initialState;
    },
  },
});
