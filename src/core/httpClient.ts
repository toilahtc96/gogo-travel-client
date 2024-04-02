import axios from "axios";

axios.defaults.baseURL = 'http://103.245.237.198:8080/';
// axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    if (!request.headers) {
      return request;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axios;
