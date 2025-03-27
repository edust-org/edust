import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { createLogger } from "redux-logger"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { rootMiddleware_OthersApi, rootReducer_OthersApi } from "./api/_others"
import { rootMiddlewareApiV0, rootReducerApiV0 } from "./api/v0"
import { themeReducers } from "./features"
import authentication from "./features/authentication"
import counterReducer from "./features/counter/counter-slice"
import institutes from "./features/institutes"

// Create logger only if in development environment
const logger =
  process.env.NODE_ENV === "development"
    ? createLogger({
        // optional configuration
        collapsed: true,
        diff: true,
      })
    : undefined

// Configuration for redux-persist
const persistConfig = {
  keyPrefix: "@edust/",
  key: "web",
  storage,
  whitelist: ["authentication", "theme"],
}

const rootReducer = combineReducers({
  ...rootReducerApiV0,
  ...rootReducer_OthersApi,
  counter: counterReducer,
  authentication,
  institutes,
  theme: themeReducers,
})

export type RootState = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    })
    // if (logger) {
    //   middleware.push(logger)
    // }
    return middleware.concat([
      ...rootMiddlewareApiV0,
      ...rootMiddleware_OthersApi,
    ])
  },
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
