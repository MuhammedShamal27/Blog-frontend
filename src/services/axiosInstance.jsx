import React from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          console.error("Refresh token missing. Redirecting to login.");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        localStorage.setItem("token", response.data.access);

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token. Redirecting to login.");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
