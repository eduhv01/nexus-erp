import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

import PrivateRoute from '../components/common/PrivateRoute'; 
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/LoginPage';                       
import RegisterPage from '../pages/RegisterPage';                 
import DashboardPage from '../pages/DashboardPage';               
import EmployeesPage from '../pages/EmployeesPage';               
import ClientsPage from '../pages/ClientsPage';                   
import FornecedorPage from '../pages/FornecedorPage';             
import ProductsPage from '../pages/ProductsPage';                 

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> 
      
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/fornecedores" element={<FornecedorPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};