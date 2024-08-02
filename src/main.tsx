import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import router from "./routes";

import axios from "axios";

// Axios - Set default configurations
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
