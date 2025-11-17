import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../../features/products/product.models';

interface ProductsState {
  items: Array<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>;
}

const loadFromLocalStorage = (): Array<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>> => {
  try {
    const stored = localStorage.getItem('products:list');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: ProductsState = {
  items: loadFromLocalStorage(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(product => product.produtoID !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Array<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>>) => {
      state.items = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
