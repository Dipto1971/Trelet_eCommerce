import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;

            state.cartItems = state.cartItems.filter((x) => x._id !== id);

            return updateCart(state);
        },
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
//Exporting as an action is necessary to use it in the frontend/src/screens/CartScreen.js file
export default cartSlice.reducer;
