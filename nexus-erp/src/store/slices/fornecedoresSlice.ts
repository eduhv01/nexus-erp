import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IFornecedor } from '../../features/fornecedor/fornecedor.models';

interface FornecedoresState {
  items: Array<Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>>;
}

const loadFromLocalStorage = (): Array<Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>> => {
  try {
    const stored = localStorage.getItem('fornecedores:list');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: FornecedoresState = {
  items: loadFromLocalStorage(),
};

const fornecedoresSlice = createSlice({
  name: 'fornecedores',
  initialState,
  reducers: {
    addFornecedor: (state, action: PayloadAction<Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>>) => {
      state.items.push(action.payload);
    },
    deleteFornecedor: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(fornecedor => fornecedor.fornecedorID !== action.payload);
    },
    setFornecedores: (state, action: PayloadAction<Array<Omit<IFornecedor, '_id' | 'createdAt' | 'updatedAt'>>>) => {
      state.items = action.payload;
    },
  },
});

export const { addFornecedor, deleteFornecedor, setFornecedores } = fornecedoresSlice.actions;
export default fornecedoresSlice.reducer;
