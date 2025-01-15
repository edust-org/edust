import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"

import { HelmetProvider } from "react-helmet-async"
import App from "./app"

async function enableMocking() {
  const isDev = process.env.NODE_ENV === "development"
  const isMockEnabled = import.meta.env.VITE_USE_MOCKS === "true"

  // Only enable mocking if in development and mocks are enabled
  if (!(isDev && isMockEnabled)) {
    return null
  }

  const { worker } = await import("@/mocks")

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={<div>PersistGate Loading...</div>}
          persistor={persistor}
        >
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  )
})
