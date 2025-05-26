import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bookreview-j8bq.onrender.com', // Adjust this if your backend runs on a different port
  withCredentials: true, // important for sending cookies (JWT)
});

export default axiosInstance;
