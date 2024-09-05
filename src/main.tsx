import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import App from "./app";

import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

// Axios - Set default configurations
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
