import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IClient } from '../../features/clients/client.models';

interface ClientsState {
  items: Array<Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>>;
}

// Load from localStorage
const loadFromLocalStorage = (): Array<Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>> => {
  try {
    const stored = localStorage.getItem('clients:list');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: ClientsState = {
  items: loadFromLocalStorage(),
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>>) => {
      state.items.push(action.payload);
    },
    deleteClient: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(client => client.clienteID !== action.payload);
    },
    setClients: (state, action: PayloadAction<Array<Omit<IClient, '_id' | 'createdAt' | 'updatedAt'>>>) => {
      state.items = action.payload;
    },
  },
});

export const { addClient, deleteClient, setClients } = clientsSlice.actions;
export default clientsSlice.reducer;
