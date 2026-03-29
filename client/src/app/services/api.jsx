import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// auth
export const apiLogin = async (userData) => {
  const res = await API.post("/auth/login", userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// interceptor for sending the token with req
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
