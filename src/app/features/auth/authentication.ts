import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the authentication state
export interface AuthenticationState {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  user?: null | object;
}

// Define the initial state
const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
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
        user?: null | object;
        isLoading?: boolean;
      }>
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.isLoading = action.payload.isLoading ?? false;
    },
  },
});
