import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IEmployee } from '../../features/employees/employees.models';

interface EmployeesState {
  items: Array<Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>>;
}

const loadFromLocalStorage = (): Array<Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>> => {
  try {
    const stored = localStorage.getItem('employees:list');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: EmployeesState = {
  items: loadFromLocalStorage(),
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>>) => {
      state.items.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(employee => employee.funcionarioID !== action.payload);
    },
    setEmployees: (state, action: PayloadAction<Array<Omit<IEmployee, '_id' | 'createdAt' | 'updatedAt'>>>) => {
      state.items = action.payload;
    },
  },
});

export const { addEmployee, deleteEmployee, setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
