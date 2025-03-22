import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API__DOMAIN,
  headers: {
    'ngrok-skip-browser-warning':  '69420',
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(localStorage.getItem("stage-help-desk"));
    if (user?.access_token) {
      config.headers["Authorization"] = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = JSON.parse(localStorage.getItem("stage-help-desk"));
        if (!user?.refresh_token) {
          throw new Error("No refresh token available");
        }

        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API__DOMAIN}/token/refresh/`,
          { refresh: user.refresh_token }
        );

        localStorage.setItem(
          "stage-help-desk",
          JSON.stringify({ ...user, access_token: refreshResponse.data.access })
        );

        originalRequest.headers["Authorization"] = `Bearer ${refreshResponse.data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired, logging out...");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
