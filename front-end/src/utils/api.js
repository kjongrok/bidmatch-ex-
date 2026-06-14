import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // Vite proxy handles /api
  baseURL: '/api',
  timeout: 10000,
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, token might be expired.
      // We can clear the token and force a reload/redirect to login.
      localStorage.removeItem('token');
      // Uncomment the below line if you want to hard redirect on 401
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
