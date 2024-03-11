import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productSlice';
import productsFieldReducer from './productFieldSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productsFields: productsFieldReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;