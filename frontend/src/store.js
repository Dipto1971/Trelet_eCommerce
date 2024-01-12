import { configureStore } from '@reduxjs/toolkit';
// this file will be used to create the store and export it to the app component
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        // this is where we will add reducers
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // If i put getDefaultMiddleware().concat(apiSlice.middleware) in the {} brackets, it will not work because it will be treated as an object
    devTools: true,
});

export default store;