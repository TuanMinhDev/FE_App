import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: {
      listCarts: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getCartStart: (state) => {
      state.products.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts = action.payload;
    },
    getProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductFailure } =
  productSlice.actions;

export default productSlice.reducer;
