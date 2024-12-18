import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register:{
            isFetching: false,
            error: false,
            success: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
        },
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
            state.login.isFetching = false;
            state.login.error = false;
        },
        loginFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        registerStart: (state) => {
            state.register.isFetching = true;
            
        },
        registerSuccess: (state) => {

            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } = loginSlice.actions;

export default loginSlice.reducer;
