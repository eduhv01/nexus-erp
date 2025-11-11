import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ClientsPage from '../pages/ClientsPage';
import ProductsPage from '../pages/ProductsPage';
import EmployeesPage from '../pages/EmployeesPage';
import FornecedorPage from '../pages/FornecedorPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from '../components/common/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'clientes', element: <ClientsPage /> },
            { path: 'produtos', element: <ProductsPage /> },
            { path: 'funcionarios', element: <EmployeesPage /> },
            { path: 'fornecedor', element: <FornecedorPage /> },
        ],
    },
]);

export const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};