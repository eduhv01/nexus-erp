import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientsReducer from './slices/clientsSlice';
import productsReducer from './slices/productsSlice';
import employeesReducer from './slices/employeesSlice';
import fornecedoresReducer from './slices/fornecedoresSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientsReducer,
    products: productsReducer,
    employees: employeesReducer,
    fornecedores: fornecedoresReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
