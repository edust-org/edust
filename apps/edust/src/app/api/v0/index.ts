import { authApi } from "./auth"
import { institutesApi } from "./institutes"
import { organizationsApi } from "./organizations"
import { publicApi } from "./public"

export const rootReducerApiV0 = {
  [authApi.reducerPath]: authApi.reducer,
  [institutesApi.reducerPath]: institutesApi.reducer,
  [organizationsApi.reducerPath]: organizationsApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
}

export const rootMiddlewareApiV0 = [
  authApi.middleware,
  institutesApi.middleware,
  organizationsApi.middleware,
  publicApi.middleware,
]
