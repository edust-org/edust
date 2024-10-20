import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "./features/counter/counter-slice";
import { createLogger } from "redux-logger";
import { rootMiddlewareApiV0, rootReducerApiV0 } from "./api/v0";
import { authReducers, themeReducers } from "./features";

const logger = createLogger({
  // optional configuration
  collapsed: true,
  diff: true,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = combineReducers({
  ...rootReducerApiV0,
  counter: counterReducer,
  auth: authReducers,
  theme: themeReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(rootMiddlewareApiV0);
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
