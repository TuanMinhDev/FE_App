import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
const store = configureStore({
  reducer: {
    login: loginReducer, 
    users: userReducer,
    products: productReducer,
  },
});

export default store;
