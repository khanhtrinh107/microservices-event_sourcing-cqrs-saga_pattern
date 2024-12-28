import axios from "axios";
import Cookies from "js-cookie";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

baseAPI.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        handleRedirectToLogin();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        const newAccessToken = res.data.result.token;

        Cookies.set("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return baseAPI(originalRequest);
      } catch (refreshError) {
        handleLogoutAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      handleLogoutAndRedirect();
    }

    return Promise.reject(error);
  }
);

const handleRedirectToLogin = () => {
  Cookies.remove("accessToken");
  localStorage.removeItem("userSession");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

const handleLogoutAndRedirect = () => {
  Cookies.remove("accessToken");
  localStorage.removeItem("userSession");
  handleRedirectToLogin();
};

export default baseAPI;
