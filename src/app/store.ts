import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter-slice";
import { pokemonApi } from "./pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/v0/auth";

const rootReducer = combineReducers({
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([pokemonApi.middleware, authApi.middleware]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
