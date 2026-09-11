import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const checkout = createAsyncThunk(
    'cart/checkout',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const cartItems = state.cart.cartItems;
            const qty = state.cart.quantity;
            const totalPrice = state.cart.totalPrice;

            const orderData = {
                items: cartItems,
                qty: qty,
                total: totalPrice
            }

            const response = await axios.post('http://localhost:8000/orders', orderData, {
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to place order");
        }        
    }
)

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    status: 'idle'
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
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(checkout.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(checkout.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(checkout.rejected, (state) => {
            state.status = 'rejected';
        });
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer; // default export, we can rename it.