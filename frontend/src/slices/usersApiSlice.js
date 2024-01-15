import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

// From this we should be able to dispatch the login action from the frontend/src/screens/LoginScreen.js file. We will use the useLoginMutation hook to dispatch the login action from the frontend/src/screens/LoginScreen.js file.

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;

// Convention: use<endpointName>Mutation


