import axios from 'axios';
const axiosInstance=  axios.create({
       baseURL:'http://13.50.122.77/api'})

   axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default axiosInstance