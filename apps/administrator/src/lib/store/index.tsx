"use client"

import { Loading } from "@/components"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from "./store"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading.FullScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
