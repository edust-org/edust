import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import counterReducer from "./features/counter/counter-slice"
import { createLogger } from "redux-logger"
import { rootMiddlewareApiV0, rootReducerApiV0 } from "./api/v0"
import { themeReducers } from "./features"
import authentication from "./features/authentication"
import { rootMiddleware_OthersApi, rootReducer_OthersApi } from "./api/_others"

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
  key: "edust",
  storage,
  whitelist: ["authentication", "theme"],
}

const rootReducer = combineReducers({
  ...rootReducerApiV0,
  ...rootReducer_OthersApi,
  counter: counterReducer,
  authentication,
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
    if (logger) {
      middleware.push(logger)
    }
    return middleware.concat([
      ...rootMiddlewareApiV0,
      ...rootMiddleware_OthersApi,
    ])
  },
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
