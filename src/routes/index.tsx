import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Landing from '../pages';
import { ROUTES } from '../lib/constants';
import Transactions from '../pages/dashboard/Transactions';
import Loans from '../pages/dashboard/Loans';
import { DashboardLayout } from '../components/layouts/dashboard/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Landing />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'home', element: <Dashboard /> },
      { path: 'loans', element: <Loans /> },
      { path: 'transactions', element: <Transactions /> },
    ],
  },
]);
