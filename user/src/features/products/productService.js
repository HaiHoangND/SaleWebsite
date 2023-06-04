import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProducts = async (userData) => {
  try {
    const response = await axios.get(`${base_url}product`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('token')}`,
      // }
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    // Handle any exceptions that occurred during the registration process
    throw new Error(error.message);
  }
};

const addToWishList = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getProducts,
  addToWishList,
};
