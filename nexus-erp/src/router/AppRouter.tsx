import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import ClientsPage from '../pages/ClientsPage';
import ProductsPage from '../pages/ProductsPage';
import EmployeesPage from '../pages/EmployeesPage';
import AgendaPage from '../pages/AgendaPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [

            { index: true, element: <DashboardPage /> },
            { path: 'clientes', element: <ClientsPage /> },
            { path: 'produtos', element: <ProductsPage /> },
            { path: 'funcionarios', element: <EmployeesPage /> },
            { path: 'agenda', element: <AgendaPage /> },
        ],
    },

]);

export const AppRouter: React.FC = () => {
    return <RouterProvider router={router} />;
};