import type { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Save to localStorage after each action
  try {
    localStorage.setItem('clients:list', JSON.stringify(state.clients.items));
    localStorage.setItem('products:list', JSON.stringify(state.products.items));
    localStorage.setItem('employees:list', JSON.stringify(state.employees.items));
    localStorage.setItem('fornecedores:list', JSON.stringify(state.fornecedores.items));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }

  return result;
};
