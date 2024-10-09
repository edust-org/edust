import { Organization, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null | undefined;
  organizations: null | Organization[];
  token: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  organizations: null,
  token: "",
};

export const authentication = createSlice({
  name: "authAuthentication",
  initialState,
  reducers: {
    setAuthentication(state, action: PayloadAction<AuthenticationState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.organizations = action.payload.organizations;
      state.isLoading = action.payload.isLoading;
    },
    signOut() {
      localStorage.clear();
      return initialState;
    },
  },
});
