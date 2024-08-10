import { authApi } from "./auth";
import { organizationsApi } from "./organizations";
import { profileApi } from "./profile";
import { userApi } from "./user";

export const rootReducerApiV0 = {
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
};

export const rootMiddlewareApiV0 = [
  authApi.middleware,
  profileApi.middleware,
  userApi.middleware,
  organizationsApi.middleware,
];
