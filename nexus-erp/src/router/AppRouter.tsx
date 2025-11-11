import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import DashboardPage from '../pages/DashboardPage';
import ClientsPage from '../pages/ClientsPage';
import ProductsPage from '../pages/ProductsPage';
import EmployeesPage from '../pages/EmployeesPage';
import FornecedorPage from '../pages/FornecedorPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} /> 
        
        <Route path="clientes" element={<ClientsPage />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="funcionarios" element={<EmployeesPage />} />
        <Route path="fornecedores" element={<FornecedorPage />} />
        <Route path="*" element={<h2>Página não encontrada (404)</h2>} />
      </Route>
    </Routes>
  );
};