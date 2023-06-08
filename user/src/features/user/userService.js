import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
      if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
      }
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const getUserWishlist = async () => {
  try {
    const response = await axios.get(`${base_url}user/wishlist`, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  register,
  login,
  getUserWishlist,
  addToCart,
  getCart,
};
