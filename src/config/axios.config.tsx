import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { updateToken, logout } from "@store/auth/authSlice";

const useAxios = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken
  );

  const axiosInstance = axios.create({
    baseURL: "https://aqalmanagementsolutions.com/api",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        refreshToken &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const response = await axios.post(
            "http://13.50.122.77/api/users/token/refresh/",
            {
              refreshToken,
            }
          );

          const newAccessToken = response.data.accessToken;
          dispatch(updateToken({ accessToken: newAccessToken }));

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token", refreshError);
          dispatch(logout());
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
