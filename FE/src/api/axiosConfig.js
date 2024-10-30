import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage mỗi lần trước khi gửi request
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      config.headers.Authorization = authToken; // Đảm bảo có tiền tố 'Bearer'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
