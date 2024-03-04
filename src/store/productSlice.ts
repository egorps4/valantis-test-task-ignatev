import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/productInterfaces";
import { IProductIdsReq, IProductItemsReq } from "../interfaces/productsReqParams";
import ProductService from "../services/ProductService";

interface ProductsState {
    products: IProduct[];
    productsIds: string[];
    isLoading: boolean;
    error: string | null;
    page: number;
    limit: number;
}

const initialState: ProductsState = {
    products: [],
    productsIds: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 50,
};

export const getProductsIdsAsync = createAsyncThunk(
    'products/getProductsIds',
    async (body: IProductIdsReq) => {
        const response = await ProductService.getProductsIds(body);

        if (response) {
            return response.data.result;
        }
    }
)

export const getProductsAsync = createAsyncThunk(
    'products/getProducts',
    async (body: IProductItemsReq) => {
        const response = await ProductService.getProductsItems(body);

        if (response) {
            return response.data.result;
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
        decrementPage: (state) => {
            state.page -= 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsIdsAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsIdsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.productsIds = action.payload;
                }
            })
            .addCase(getProductsIdsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.page--;
                state.error = 'Произошла ошибка во время получения списка продуктов';
                console.log(action.error.message);
            });

        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.products = action.payload;
                }
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.page--;
                state.error = 'Произошла ошибка во время получения списка продуктов';
                console.log(action.error.message);
            });

    },
});

export const { incrementPage, decrementPage } = productSlice.actions;

export default productSlice.reducer;