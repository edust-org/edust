// profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(profileApi.endpoints.getProfile.matchPending, () => {})
      .addMatcher(
        profileApi.endpoints.getProfile.matchFulfilled,
        (state, action) => {
          state.user = action.payload.data.user;
          state.loading = false;
        }
      )
      .addMatcher(
        profileApi.endpoints.getProfile.matchRejected,
        (state, action) => {
          state.error = action.error.message || "Failed to fetch profile";
          state.loading = false;
        }
      );
  },
});
export const { setProfile, setProfileLoading, setProfileError } =
  profileSlice.actions;

export default profileSlice.reducer;
