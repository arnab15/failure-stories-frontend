/* eslint-disable no-underscore-dangle */
import axios from "axios";
// eslint-disable-next-line import/no-cycle
import authService from "./authService";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("_accessToken");
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers["x-auth-token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return authService.getRefreshedToken().then((res) => {
        if (res.status === 200) {
          localStorage.setItem("_accessToken", res.data.accessToken);
          console.log("Access token refreshed!");
          return axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status <= 500;
//   if (!expectedError) {
//     // console.log("Logging the error", error);
//     console.log("Unexpected Error occured");
//   }
//   return Promise.reject(error);
// });
// const setJwt = (token) => {
//   axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;
// };

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
