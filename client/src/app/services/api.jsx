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

export const apiRegister = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch APIs

// USER
export const fetchUserData = async (id) => {
  const { data } = await API.get(`/users/${id}`);
  return data;
};

// PRODUCTS
export const fetchProductsBySeller = async (id) => {
  const { data } = await API.get(`/products/seller/${id}`);
  return data;
};

export const fetchProductsById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

// CREATE PRODUCT
export const createProduct = async (productData) => {
  try {
    const { data } = await API.post("/products", productData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  try {
    const { data } = await API.put(`/products/${id}`, productData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ORDERS
export const fetchOrdersBySeller = async (id) => {
  const { data } = await API.get(`/orders/seller/${id}`);
  return data;
};

export const fetchOrdersById = async (id) => {
  const { data } = await API.get(`/orders/${id}`);
  return data;
};