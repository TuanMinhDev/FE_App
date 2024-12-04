import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      listProducts: [],
      isFetching: false,
      error: false,
    },
    singleProduct: {
      product: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    // Get All Products
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

    // Get Product by ID
    getProductByIdStart: (state) => {
      state.singleProduct.isFetching = true;
    },
    getProductByIdSuccess: (state, action) => {
      state.singleProduct.isFetching = false;
      state.singleProduct.product = action.payload;
    },
    getProductByIdFailure: (state) => {
      state.singleProduct.isFetching = false;
      state.singleProduct.error = true;
    },

    // Post Product
    postProductStart: (state) => {
      state.products.isFetching = true;
    },
    postProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts.push(action.payload);
    },
    postProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },

    // Delete Product
    deleteProductStart: (state) => {
      state.products.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.listProducts = state.products.listProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    deleteProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },

    // Update Product (PUT)
    putProductStart: (state) => {
      state.products.isFetching = true;
    },
    putProductSuccess: (state, action) => {
      state.products.isFetching = false;
      const index = state.products.listProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index >= 0) {
        state.products.listProducts[index] = action.payload;
      }
    },
    putProductFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailure,
  postProductStart,
  postProductSuccess,
  postProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  putProductStart,
  putProductSuccess,
  putProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
