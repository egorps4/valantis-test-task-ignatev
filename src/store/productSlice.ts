import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/productInterfaces";
import { IProductFilterReq, IProductIdsReq } from "../interfaces/productsReqParams";
import ProductService from "../services/ProductService";

interface ProductsState {
    products: IProduct[];
    productsIds: string[];
    pendingRequest: boolean;
    error: string | null;
    page: number;
    limit: number;
}

const initialState: ProductsState = {
    products: [],
    productsIds: [],
    pendingRequest: false,
    error: null,
    page: 1,
    limit: 50,
};

export const getProductsAsync = createAsyncThunk(
    'products/getProducts',
    async (body: IProductIdsReq) => {
        const responseIds = await ProductService.getProductsIds(body);

        if (responseIds) {
            const uniqProductsIds = Array.from(new Set(responseIds.data.result))
            const responseProducts = await ProductService.getProductsItems({
                action: 'get_items',
                params: { ids: uniqProductsIds },
            })

            if (responseProducts) {
                return responseProducts.data.result;
            }
        }
    }
)

export const getFilteredProductsAsync = createAsyncThunk(
    'products/getFilteredProducts',
    async (body: IProductFilterReq) => {
        const responseIds = await ProductService.getFilteredProducts(body);

        if (responseIds) {
            const uniqProductsIds = Array.from(new Set(responseIds.data.result));
            const responseProducts = await ProductService.getProductsItems({
                action: 'get_items',
                params: { ids: uniqProductsIds },
            })

            if (responseProducts) {
                return responseProducts.data.result;
            }
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
        decrementPage: (state) => {
            state.page -= 1;
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.pendingRequest = true;
                state.error = null;
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.pendingRequest = false;
                if (action.payload) {
                    state.products = action.payload;
                }
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.pendingRequest = false;
                state.error = 'Произошла ошибка во время получения списка продуктов';
                console.log(action.error.message);
                throw new Error(action.error.message);
            });

        builder
            .addCase(getFilteredProductsAsync.pending, (state) => {
                state.pendingRequest = true;
                state.error = null;
            })
            .addCase(getFilteredProductsAsync.fulfilled, (state, action) => {
                state.pendingRequest = false;
                if (action.payload) {
                    state.products = action.payload;
                }
            })
            .addCase(getFilteredProductsAsync.rejected, (state, action) => {
                state.pendingRequest = false;
                state.error = 'Произошла ошибка во время получения списка продуктов';
                console.log(action.error.message);
                throw new Error(action.error.message);
            });
    },
});

export const { incrementPage, decrementPage, changePage } = productsSlice.actions;

export default productsSlice.reducer;