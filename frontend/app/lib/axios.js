import axios from "axios";

// ─── Instance ────────────────────────────────────────────────────────────────

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURL || "/api",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

// ─── Request Interceptor ─────────────────────────────────────────────────────

API.interceptors.request.use(
  (config) => config, // cookies are sent automatically via withCredentials
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Handle 401 – attempt token refresh once
    const isAuthRequest = original.url?.includes("/auth/login") || original.url?.includes("/auth/register");
    const isRefreshRequest = original.url?.includes("/auth/refresh-token");

    if (error.response?.status === 401 && !original._retry && !isAuthRequest && !isRefreshRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(original))
          .catch((err) => Promise.reject(err));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await API.post("/auth/refresh-token");
        processQueue(null);
        return API(original);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Redirect to login if refresh token is missing or expired (401 on refresh request)
    if (error.response?.status === 401 && isRefreshRequest) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Normalise error shape for easy consumption
    return Promise.reject(normaliseError(error));
  }
);

// ─── Error Normaliser ────────────────────────────────────────────────────────

function normaliseError(error) {
  if (error.response) {
    // Server responded with a non-2xx status
    const { status, data } = error.response;
    return {
      status,
      message: data?.message || data?.error || "An error occurred",
      errors: data?.errors || null,
      raw: error,
    };
  }

  if (error.request) {
    // Request was made but no response received
    return {
      status: null,
      message: "Network error - please check your connection",
      errors: null,
      raw: error,
    };
  }

  return {
    status: null,
    message: error.message || "Unexpected error",
    errors: null,
    raw: error,
  };
}

// ─── Convenience Helpers ─────────────────────────────────────────────────────

export const get = (url, config = {}) => API.get(url, config);
export const post = (url, data, config = {}) => API.post(url, data, config);
export const put = (url, data, config = {}) => API.put(url, data, config);
export const patch = (url, data, config = {}) => API.patch(url, data, config);
export const remove = (url, config = {}) => API.delete(url, config);

export default API;
