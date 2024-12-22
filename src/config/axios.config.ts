import axios from "axios";

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp * 1000; 
  return Date.now() > exp;
};

const axiosInstance = axios.create({
  baseURL: "http://13.50.122.77/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      window.location.href = "/login"; 
    } else if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
