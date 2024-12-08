import { Product, ProductState } from "../types/product";
import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState : ProductState = {
    products : [],
    filteredProducts : [],
    loading: false,
    error: '',
    searchQuery: '',
    selectedCategory: ''
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      return response.data;
    }
);

const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        setSearchQuery : (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.filteredProducts = filterProducts(state);
        },
        setSelectedCategory : (state,action : PayloadAction<string>) => {
            state.selectedCategory = action.payload;
            state.filteredProducts = filterProducts(state); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = filterProducts(state);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
})

const filterProducts = (state : ProductState) : Product[] => {
    return state.products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = product.category === state.selectedCategory || !state.selectedCategory;
        return matchesCategory && matchesSearch;
    });
};

export const { setSearchQuery , setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;