import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // fetching dummy data

        const response = await fetch('/api/products.json');
        const data = (await response).json();
        return data;
    }
)

const initialState = {
    items: [],
    status: 'idle',
    error: 'null'
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer; // default export, can be renamed.