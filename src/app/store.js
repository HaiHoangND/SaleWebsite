import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReducer,
    product: productReducer,
  },
});
