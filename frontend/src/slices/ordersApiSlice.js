import { ORDERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (OrderId) => ({
                url: `${ORDERS_URL}/${OrderId}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        PayOrder: builder.mutation({
            query: ({OrderId, paymentResult}) => ({
                url: `${ORDERS_URL}/${OrderId}/pay`,
                method: 'PUT',
                body: {...paymentResult},
            }),
        }),
        getPayPalClientId: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/config/paypal`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (OrderId) => ({
                url: `${ORDERS_URL}/${OrderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery, useGetPayPalClientIdQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;