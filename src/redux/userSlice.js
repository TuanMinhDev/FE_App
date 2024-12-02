import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailure: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },

    deleteUsersStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
    },
    deleteUsersFailure: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersFailure, deleteUsersStart, deleteUsersSuccess, deleteUsersFailure } =
  userSlice.actions;

export default userSlice.reducer;
