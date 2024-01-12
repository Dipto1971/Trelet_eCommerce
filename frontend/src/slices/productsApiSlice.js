import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () =>({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) =>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;

//Convention for naming the slice is to use the name of the endpoint with the use prefix. In this case, since we are injecting the endpoints from the productsApiSlice, the name of the slice will be productsApiSlice. The useGetProductsQuery hook will be used to fetch the products from the backend. The useGetProductsDetailsQuery hook will be used to fetch the details of a product from the backend.

// builder object has a query method that takes an object with a query property which is a function that returns the url to fetch data from the backend

//Main purpose of this file is to create a slice that will be used to fetch data from the backend. We will use this slice in the frontend/src/components/HomeScreen.js file to fetch the products from the backend.
//Injecting endpoints into the apiSlice object will create a new slice with the same name as the apiSlice object. In this case, the new slice will be called productsApiSlice. The new slice will have a useGetProductsQuery hook that can be used to fetch the products from the backend.