import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


/**
 * improvement: 
 * Add authorization if later it require here 
 * 
 * Description: interceptors here for requests or responses
 * 
 */

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
