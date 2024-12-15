import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN", // Optional: Add token if needed
  },
});

// Add interceptors if needed (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add logic before request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  (error) => {
    // Handle response error
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
