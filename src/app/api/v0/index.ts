import { authApi } from "./auth";
import { profileApi } from "./profile";

export const rootReducerApiV0 = {
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
};

export const rootMiddlewareApiV0 = [authApi.middleware, profileApi.middleware];
