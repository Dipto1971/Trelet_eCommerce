import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () =>({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) =>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (newProduct) =>({
                url: PRODUCTS_URL,
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data.product,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});


export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation } = productsApiSlice;