import { authApi } from "./auth";
import { organizationsApi } from "./organizations";
import { publicApi } from "./public";
import { userApi } from "./user";

export const rootReducerApiV0 = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
};

export const rootMiddlewareApiV0 = [
  authApi.middleware,
  userApi.middleware,
  organizationsApi.middleware,
  publicApi.middleware,
];
