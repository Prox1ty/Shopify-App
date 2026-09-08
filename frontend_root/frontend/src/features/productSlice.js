import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (lastLoadedId) => {
        const cursor = lastLoadedId ?? -1;
        const response = await fetch(`http://localhost:8000/api/products/${cursor}`);
        if (!response.ok) {
            throw new Error(`Failed to load products (${response.status})`);
        }

        const data = await response.json();
        return data;
    },
    {
        // redux request guard. Protects against react's strict mode double render.
        condition: (_, { getState }) => getState().products.status !== 'loading'
    }
)

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    hasMore: true
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload.products;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items.push(...action.payload.products);
            state.hasMore = action.payload.hasMore;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer; // default export, can be renamed.