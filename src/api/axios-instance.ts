import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // timeout: 1000, // Optional timeout configuration
  headers: { "Content-Type": "application/json" },
});

// Add interceptors for requests and responses
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization headers or any other custom headers here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    if (error.response.status === 401) {
      // Redirect to login or handle unauthorized errors
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
