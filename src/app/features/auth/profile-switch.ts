import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfileSwitchState {
  authenticated?: undefined | "user";
  userRole?: undefined | string;
  organizationRole?: undefined | string;
  activeMode: undefined | string | boolean;
}

const initialState: ProfileSwitchState = {
  authenticated: undefined,
  userRole: undefined,
  organizationRole: undefined,
  activeMode: undefined,
};

export const profileSwitch = createSlice({
  name: "authProfileSwitch",
  initialState,
  reducers: {
    setProfileMode(state, action: PayloadAction<ProfileSwitchState>) {
      state.authenticated = action.payload.authenticated;
      state.userRole = action.payload.userRole;
      state.organizationRole = action.payload.organizationRole;
      state.activeMode = action.payload.activeMode;
    },
    setProfileActiveMode(state, action: PayloadAction<string>) {
      switch (action.payload) {
        case state.authenticated:
          state.activeMode = action.payload;
          break;
        case state.organizationRole:
          state.activeMode = action.payload;
          break;
        case state.userRole:
          state.activeMode = action.payload;
          break;

        default:
          state.activeMode = undefined;
          break;
      }
    },
  },
});
