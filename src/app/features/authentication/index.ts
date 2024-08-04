// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setAuthentication } = authSlice.actions;
export default authSlice.reducer;
