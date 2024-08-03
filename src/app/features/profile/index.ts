// profileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { profileApi, User } from "../../api/v0/profile";
export interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(profileApi.endpoints.getProfile.matchPending, () => {})
      .addMatcher(
        profileApi.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload.data.user;
        }
      )
      .addMatcher(
        profileApi.endpoints.getProfile.matchRejected,
        (state, action) => {
          state.error = action.error.message || "Failed to fetch profile";
        }
      );
  },
});

export default profileSlice.reducer;
