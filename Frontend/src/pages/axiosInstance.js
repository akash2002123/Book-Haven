import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:8085", // Set base API URL
    });
     
    // Request Interceptor (Attach Token)
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('jwtToken'); 
        console.log(token )// Get token from storage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
     
    // Response Interceptor (Error Handling)
    axiosInstance.interceptors.response.use(
      (response) => response, // If successful, return response
      (error) => {
        if (error.response) {
          if (error.response.status === 403) {
            alert("Session expired! Redirecting to login...");
            window.location.href = "/login";
          } else if (error.response.status === 500) {
            alert("Server error! Please try again later.");
          }
        }
        return Promise.reject(error);
      }
    );
     
    export default axiosInstance;