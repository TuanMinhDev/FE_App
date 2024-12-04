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
      state.carts.isFetching = true;
    },
    getCartSuccess: (state, action) => {
      state.carts.isFetching = false;
      state.carts.listCarts = action.payload;
    },
    getCartFailure: (state) => {
      state.carts.isFetching = false;
      state.carts.error = true;
    },

    postCartStart: (state) => {
      state.carts.isFetching = true;
    },
    postCartSuccess: (state, action) => {
      state.carts.isFetching = false;
      state.carts.listCarts.push(action.payload);
    },
    postCartFailure: (state) => {
      state.carts.isFetching = false;
      state.carts.error = true;
    },

    // PUT: Cập nhật giỏ hàng
    putCartStart: (state) => {
      state.carts.isFetching = true;
    },
    putCartSuccess: (state, action) => {
      state.carts.isFetching = false;
      const index = state.carts.listCarts.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state.carts.listCarts[index] = action.payload; // Cập nhật sản phẩm
      }
    },
    putCartFailure: (state) => {
      state.carts.isFetching = false;
      state.carts.error = true;
    },

    // DELETE: Xóa sản phẩm khỏi giỏ hàng
    deleteCartStart: (state) => {
      state.carts.isFetching = true;
    },
    deleteCartSuccess: (state, action) => {
      state.carts.isFetching = false;
      state.carts.listCarts = state.carts.listCarts.filter((item) => item._id !== action.payload); // Xóa sản phẩm theo _id
    },
    deleteCartFailure: (state) => {
      state.carts.isFetching = false;
      state.carts.error = true;
    },
  },
});

export const {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  postCartStart,
  postCartSuccess,
  postCartFailure,
  putCartStart,
  putCartSuccess,
  putCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
