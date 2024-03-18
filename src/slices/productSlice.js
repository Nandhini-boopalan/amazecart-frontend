import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        product: {}
    },
    reducers: {
        productRequest(state, action){
            state.loading = true;
        },
        productSuccess(state, action) {
            state.loading = false;
            state.product = action.payload; // Corrected assignment
            state.productsCount = action.payload.count;
            state.resPerPage = action.payload.resPerPage;
          },
          
        productFail(state, action){
            state.loading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer } = productSlice;

export const { 
    productRequest, 
    productSuccess, 
    productFail,
} = actions;

export default reducer;
