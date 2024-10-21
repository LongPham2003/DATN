import axios from "axios";

// Lấy thông tin xác thực từ localStorage
const authToken = localStorage.getItem("authToken");

axios.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
