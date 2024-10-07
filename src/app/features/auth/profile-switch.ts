import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileSwitchState {
  authenticated?: boolean;
  userRole?: undefined | string;
  organizationRole?: undefined | string;
}

const initialState: ProfileSwitchState = {
  authenticated: undefined,
  userRole: undefined,
  organizationRole: undefined,
};

export const profileSwitch = createSlice({
  name: "authProfileSwitch",
  initialState,
  reducers: {
    setProfileMode(state, action: PayloadAction<ProfileSwitchState>) {
      state.authenticated = action.payload.authenticated;
      state.userRole = action.payload.userRole;
      state.organizationRole = action.payload.organizationRole;
    },
  },
});
