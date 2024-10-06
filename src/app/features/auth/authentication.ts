import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the authentication state
export interface AuthenticationState {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  user?: null | object;
  organization?: null | object;
}

// Define the initial state
const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  organization: null,
};

// Create the auth slice
export const authentication = createSlice({
  name: "authAuthentication",
  initialState,
  reducers: {
    setAuthentication(
      state,
      action: PayloadAction<{
        isAuthenticated?: boolean;
        isLoading?: boolean;
        user?: null | object;
        organization?: null | object;
      }>,
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.organization = action.payload.organization;
      state.isLoading = action.payload.isLoading;
    },
    signOut() {
      localStorage.clear();
      return initialState;
    },
  },
});
