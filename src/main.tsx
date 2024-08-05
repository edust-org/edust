import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import App from "./app";

import { BrowserRouter } from "react-router-dom";
// Axios - Set default configurations
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
