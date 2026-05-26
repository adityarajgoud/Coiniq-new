import axios from "axios";

let activeRequests = 0;
let setGlobalLoading = null;

// Register global loading setter
export const registerGlobalLoader = (setLoading) => {
  setGlobalLoading = setLoading;
};

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    activeRequests++;

    if (setGlobalLoading) {
      setGlobalLoading(true);
    }

    return config;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0 && setGlobalLoading) {
      setGlobalLoading(false);
    }

    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0 && setGlobalLoading) {
      setGlobalLoading(false);
    }

    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0 && setGlobalLoading) {
      setGlobalLoading(false);
    }

    return Promise.reject(error);
  },
);

export default api;
