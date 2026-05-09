import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Add JWT token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden - invalid or expired token
          console.error("Access forbidden:", error.response.data);
          localStorage.removeItem("auth_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          break;
        case 404:
          console.error("Resource not found:", error.response.data);
          break;
        case 500:
          console.error("Server error:", error.response.data);
          break;
        default:
          console.error("API error:", error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error("Network error:", error.message);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
