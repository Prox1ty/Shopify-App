import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // argument is an item object
            // check if the added item already exists in the cart
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);

            state.totalQuantity++;
            state.totalPrice += newItem.price;
            
            if (!existingItem) {
                // adding a new item
                state.cartItems.push({
                    id: newItem.id, // in an actual app id use nanoid here
                    title: newItem.title,
                    price: newItem.price,
                    img: newItem.imgURL,
                    quantity: 1
                });
            } else {
                // adding an existing item
                existingItem.quantity++;
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload; // argument is an id.
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity--;
                state.totalPrice -= existingItem.price;

                if (existingItem.quantity === 1) {
                    // remove the item from the cart
                    state.cartItems = state.cartItems.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                }
            }
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer; // default export, we can rename it.