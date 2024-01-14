import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: ''
    },
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            //Calculate items price: Will be the sum of all the items in the cart
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            //Calculate shipping price: Will be free if the total price is over 100
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price: 15% of the total price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            //Calculate total price: items price + shipping price + tax price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) + 
                Number(state.taxPrice)
                ).toFixed(2);
            
            localStorage.setItem('cartItems', JSON.stringify(state));
            //Save the cartItems in the local storage
        },
    }
});

export const { addToCart } = cartSlice.actions;
//Exporting as an action is necessary to use it in the frontend/src/screens/CartScreen.js file
export default cartSlice.reducer;
