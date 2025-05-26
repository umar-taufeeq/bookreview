import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/', // Adjust this if your backend runs on a different port
  withCredentials: true, // important for sending cookies (JWT)
});

export default axiosInstance;
