import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
    name: "bill",
    initialState: {
        bills: {
            bill: null, // Thay vì listBills, sử dụng bill
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getBillsStart: (state) => {
            state.bills.isFetching = true;
            state.bills.error = false; // Đặt lại trạng thái lỗi
        },
        getBillsSuccess: (state, action) => {
            state.bills.isFetching = false;
            state.bills.bill = action.payload; // Gán giá trị mới cho bill
        },
        getBillsFailure: (state) => {
            state.bills.isFetching = false;
            state.bills.error = true;
        },
        postBillStart: (state) => {
            state.bills.isFetching = true;
            state.bills.error = false; // Đặt lại trạng thái lỗi
        },
        postBillSuccess: (state, action) => {
            state.bills.isFetching = false;
            state.bills.bill = action.payload; // Gán giá trị mới cho bill
        },
        postBillFailure: (state) => {
            state.bills.isFetching = false;
            state.bills.error = true;
        },
    },
});

export const { 
    getBillsStart, 
    getBillsSuccess, 
    getBillsFailure, 
    postBillStart, 
    postBillSuccess, 
    postBillFailure 
} = billSlice.actions;

export default billSlice.reducer;
