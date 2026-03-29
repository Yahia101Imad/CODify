import axios from "axios";

// create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request Interceptor (Add Token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs

// Login
export const apiLogin = async (userData) => {
  try {
    const res = await API.post("/auth/login", userData);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register
export const apiRegister = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};