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
const authentication = createSlice({
  name: "authentication",
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
      state.isLoading = false;
    },
  },
});

// Export actions
export const { setAuthentication } = authentication.actions;

// Export the reducer
export default authentication.reducer;
