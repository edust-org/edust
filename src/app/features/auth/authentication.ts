import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const authentication = createSlice({
  name: "authAuthentication",
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<AuthenticationState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.isLoading = action.payload.isLoading;
    },
    signOut() {
      localStorage.clear();
      return initialState;
    },
  },
});
