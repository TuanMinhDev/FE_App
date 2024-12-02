import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./loginSlice";
import { getUsersStart, getUsersSuccess } from "./userSlice";

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

export const registerUser = async (user, dispatch, navigation) => {
  dispatch(registerStart());
  try {
    axios.post("http://10.0.2.2:4000/api/user/register", user);
    dispatch(registerSuccess());
    navigation.replace("Login");
  } catch (error) {
    dispatch(registerFailure(error));
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart())
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/user",{
      headers:{token : `Bearer ${accessToken}`}
    })
    dispatch(getUsersSuccess(res.data))
  } catch (error) {
    dispatch(getUsersError(error))
  }
}

export const deleteUsers = async(accessToken, dispatch, id) =>{
  dispatch(getUsersStart())
  try {
    await axios.delete(`http://10.0.2.2:4000/api/user/${id}`,{
      headers:{token : `Bearer ${accessToken}`}
    })
    dispatch(getUsersSuccess())
  } catch (error) {
    dispatch(getUsersError(error))
  }

}

export const getAllProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("http://10.0.2.2:4000/api/product");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure(error));
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post("http://10.0.2.2:4000/api/product/create", product);
    dispatch(addProductSuccess());
  } catch (error) {
    dispatch(addProductFailure(error));
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`http://10.0.2.2:4000/api/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure(error));
  }
};

export const updateProduct = async (dispatch,id, product) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put(`http://10.0.2.2:4000/api/product/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure(error));
  }
};


