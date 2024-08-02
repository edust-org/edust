import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter-slice";
import { pokemonApi } from "./pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
