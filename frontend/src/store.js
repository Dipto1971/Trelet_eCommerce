import { configureStore } from '@reduxjs/toolkit';
// this file will be used to create the store and export it to the app component
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice';
import cartSliceReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        // this is where we will add reducers
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // If i put getDefaultMiddleware().concat(apiSlice.middleware) in the {} brackets, it will not work because it will be treated as an object
    devTools: true,
});

export default store;