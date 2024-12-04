import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./loginSlice";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersError,
  deleteUsersStart,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userSlice";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  postProductStart,
  postProductSuccess,
  postProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  putProductStart,
  putProductSuccess,
  putProductFailure,
  getProductByIdStart,
  getProductByIdFailure,
  getProductByIdSuccess,
} from "./productSlice";
import {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  postCartFailure,
  postCartStart,
  postCartSuccess,
  putCartStart,
  putCartSuccess,
  putCartFailure,
  deleteCartSuccess,
  deleteCartFailure,
} from "./cartSlice";
import {
  getBillsFailure,
  getBillsStart,
  getBillsSuccess,
  postBillFailure,
  postBillStart,
  postBillSuccess,
} from "./billSlice";

// Login User
export const loginUser = async (user, dispatch, navigation) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://10.0.2.2:4000/api/user/login", user);
    dispatch(loginSuccess(res.data));

    const { role } = res.data.user;
    if (role === "admin") {
      navigation.replace("HomeAdmin");
    } else {
      navigation.replace("TrangChu");
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};

// Register User
export const registerUser = async (user, dispatch, navigation) => {
  dispatch(registerStart());
  try {
    await axios.post("http://10.0.2.2:4000/api/user/register", user);
    dispatch(registerSuccess());
    navigation.replace("Login");
  } catch (error) {
    dispatch(registerFailure());
  }
};

// Get All Users
export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersError());
  }
};

// Delete User
export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(getUsersStart());
  try {
    await axios.delete(`http://10.0.2.2:4000/api/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess());
  } catch (error) {
    dispatch(getUsersError());
  }
};

// Get All Products
export const getAllProduct = async (dispatch, accessToken) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/product", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

export const putUser = async (dispatch, info, accessToken) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put("http://10.0.2.2:4000/api/product", info, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
// Add Product
export const addProduct = async (dispatch, product, accessToken) => {
  dispatch(postProductStart());
  try {
    const res = await axios.post(
      "http://10.0.2.2:4000/api/product/create",
      product,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(postProductSuccess(res.data));
  } catch (error) {
    console.error("Error adding product:", error);
    dispatch(postProductFailure(error.message));
  }
};

// Delete Product
export const deleteProduct = async (dispatch, id, accessToken) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`http://10.0.2.2:4000/api/product/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

// Update Product
export const updateProduct = async (dispatch, id, product) => {
  dispatch(putProductStart());
  try {
    const res = await axios.put(
      `http://10.0.2.2:4000/api/product/${id}`,
      product,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(putProductSuccess(res.data));
  } catch (error) {
    dispatch(putProductFailure());
  }
};

export const getProductById = async (dispatch, id) => {
  dispatch(getProductByIdStart());
  try {
    const res = await axios.get(`http://10.0.2.2:4000/api/product/${id}`);
    dispatch(getProductByIdSuccess(res.data));
  } catch (error) {
    dispatch(getProductByIdFailure());
  }
};

export const postCart = async (dispatch, info, accessToken) => {
  dispatch(postCartStart());
  try {
    const res = await axios.post("http://10.0.2.2:4000/api/cart", info, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(postCartSuccess(res.data));
  } catch (error) {
    dispatch(postCartFailure(error));
  }
};

export const getCart = async (dispatch, accessToken) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/cart", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getCartSuccess(res.data.userCart));
  } catch {
    dispatch(getCartFailure());
  }
};

export const putCart = async (dispatch, newQuantity, size, id, accessToken) => {
  dispatch(putCartStart());
  try {
    const res = await axios.put(
      `http://10.0.2.2:4000/api/cart/${id}`,
      {
        newQuantity: newQuantity,
        size,
      },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    getCart(dispatch, accessToken);
    dispatch(putCartSuccess(res.data));
  } catch (error) {
    dispatch(putCartFailure());
  }
};

export const deleteCart = async (dispatch, size, id, accessToken) => {
  dispatch(deleteUsersStart());
  try {
    const res = await axios.delete(`http://10.0.2.2:4000/api/cart/${id}`, {
      data: { size },
      headers: { token: `Bearer ${accessToken}` },
    });
    getCart(dispatch, accessToken);
    dispatch(deleteCartSuccess(res.data));
  } catch (error) {
    dispatch(deleteCartFailure());
  }
};

export const postBill = async (
  dispatch,
  cartId,
  totalPrice,
  accessToken,
  navigation
) => {
  dispatch(postBillStart());
  try {
    const res = await axios.post(
      `http://10.0.2.2:4000/api/bill`,
      { cartId: cartId, totalPrice },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(postBillSuccess(res.data));
    navigation.navigate("Bill");
  } catch (error) {
    dispatch(postBillFailure());
  }
};

export const getBill = async (dispatch, accessToken) => {
  dispatch(getBillsStart());
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/bill", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getBillsSuccess(res.data));
  } catch (error) {
    dispatch(getBillsFailure());
  }
};

export const postBill2 = async (
  dispatch,
  productId,
  size,
  quantity,
  totalPrice,
  accessToken,
  navigation
) => {
  dispatch(postBillStart());
  try {
    const res = await axios.post(
      `http://10.0.2.2:4000/api/bill`,
      {
        productId: productId,
        size: size,
        quantity: quantity,
        totalPrice: totalPrice,
      },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(postBillSuccess(res.data));
    navigation.navigate("Bill");
  } catch (error) {
    dispatch(postBillFailure());
  }
};
