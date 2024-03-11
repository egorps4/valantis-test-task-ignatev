import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/productInterfaces";
import { IProductFieldsReq, IProductFilterReq, IProductIdsReq, IProductItemsReq } from "../interfaces/productsReqParams";
import ProductService from "../services/ProductService";

interface ProductsState {
    fields: string[];
    pendingRequest: number;
    error: string | null;
}

const initialState: ProductsState = {
    fields: [],
    pendingRequest: 0,
    error: null,
};

export const getProductsFieldsAsync = createAsyncThunk(
    'products/getProductsFields',
    async (body: IProductFieldsReq) => {
        const response = await ProductService.getProductsFields(body);

        if (response) {
            return response.data.result;
        }
    }
)

const productsFieldSlice = createSlice({
    name: 'productsField',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsFieldsAsync.pending, (state) => {
                state.pendingRequest++;
                state.error = null;
            })
            .addCase(getProductsFieldsAsync.fulfilled, (state, action) => {
                state.pendingRequest--
                if (action.payload) {
                    state.fields = action.payload;
                }
            })
            .addCase(getProductsFieldsAsync.rejected, (state, action) => {
                state.pendingRequest--
                state.error = 'Произошла ошибка во время получения списка тегов';
                console.log(action.error.message);
            });
    },
});


export default productsFieldSlice.reducer;