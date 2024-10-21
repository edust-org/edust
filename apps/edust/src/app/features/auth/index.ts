import { combineReducers } from "@reduxjs/toolkit";
import { authentication } from "./authentication";
import { profileSwitch } from "./profile-switch";

// Actions
export const { setAuthentication, signOut } = authentication.actions;

export const { setProfileMode, setProfileActiveMode, clearProfileMode } =
  profileSwitch.actions;

// Reducers
export const authReducers = combineReducers({
  authentication: authentication.reducer,
  profileSwitch: profileSwitch.reducer,
});

export type AuthState = ReturnType<typeof authReducers>;
