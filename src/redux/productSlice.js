import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      listProducts: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    // Lấy sản phẩm
    getProductStart: (state) => {
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

    // Xóa sản phẩm
    deleteProductStart: (state) => {
      state.products.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts = state.products.listProducts.filter(
        (product) => product.id !== action.payload // Xóa sản phẩm dựa trên ID
      );
    },
    deleteProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },

    // Sửa sản phẩm
    updateProductStart: (state) => {
      state.products.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts = state.products.listProducts.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    updateProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },

    // Thêm sản phẩm
    addProductStart: (state) => {
      state.products.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts.push(action.payload); 
    },
    addProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
