import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import billReducer from './billSlice';
const store = configureStore({
  reducer: {
    login: loginReducer, 
    users: userReducer,
    products: productReducer,
    carts: cartReducer,
    bills: billReducer,
  },
  
});

export default store;
