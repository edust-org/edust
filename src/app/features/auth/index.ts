import { combineReducers } from "@reduxjs/toolkit";
import { authentication } from "./authentication";

// Actions
export const { setAuthentication } = authentication.actions;

// Reducers
export const authReducers = combineReducers({
  authentication: authentication.reducer,
});

export type AuthState = ReturnType<typeof authReducers>;
