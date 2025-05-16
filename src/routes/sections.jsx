import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import useAuthStore from 'src/store/auth-store';

// --------------- Public Pages ---------------
export const LoginPage = lazy(() => import('src/pages/login'));
export const SetPasswordPage = lazy(() => import('src/pages/set-password'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// --------------- Auth Pages ---------------
export const IndexPage = lazy(() => import('src/pages/app'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const InventoryItemPage = lazy(() => import('src/pages/inventory-item'));
export const WorkordersPage = lazy(() => import('src/pages/workorders'));
export const CustomerDetailsPage = lazy(() => import('src/pages/customer-details'));
export const JobsPage = lazy(() => import('src/pages/jobs'));
export const WorkorderDetailsPage = lazy(() => import('src/pages/workorder-details'));
export const SuppliersPage = lazy(() => import('src/pages/suppliers'));
export const SupplierInfoPage = lazy(() => import('src/pages/supplier-details'));
export const AccountsPage = lazy(() => import('src/pages/accounts'));
export const EmployeesPage = lazy(() => import('src/pages/employees'));
export const UsersPage = lazy(() => import('src/pages/users'));

// ----------------------------------------------------------------------

// Authenticated Routes
const AuthenticatedRoutes = (
  <DashboardLayout>
    <Suspense>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

// Public Routes
const PublicRoutes = [
  { path: NAVIGATION_ROUTES.login, element: <LoginPage /> },
  { path: NAVIGATION_ROUTES.set_password, element: <SetPasswordPage /> },
  { path: NAVIGATION_ROUTES.not_found, element: <Page404 /> },
  {
    path: NAVIGATION_ROUTES.all_path,
    element: <Navigate to={NAVIGATION_ROUTES.not_found} replace />,
  }, // Redirect to login if not authenticated
];

const Router = () => {
  const { auth } = useAuthStore.getState();
  const isAuthenticated = auth.isLoggedIn;

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated ? (
        AuthenticatedRoutes
      ) : (
        <Navigate to={NAVIGATION_ROUTES.login} replace />
      ),
      children: [
        { path: '/', element: <Navigate to={NAVIGATION_ROUTES.dashboard.base} replace /> },
        { path: NAVIGATION_ROUTES.dashboard.base, element: <IndexPage /> },
        { path: NAVIGATION_ROUTES.customers.base, element: <CustomersPage /> },
        { path: NAVIGATION_ROUTES.inventory.base, element: <InventoryPage /> },
        { path: NAVIGATION_ROUTES.inventory.details.base, element: <InventoryItemPage /> },
        { path: NAVIGATION_ROUTES.workorders.base, element: <WorkordersPage /> },
        { path: NAVIGATION_ROUTES.customers.Details.base, element: <CustomerDetailsPage /> },
        { path: NAVIGATION_ROUTES.jobs.base, element: <JobsPage /> },
        { path: NAVIGATION_ROUTES.jobs.details.base, element: <WorkorderDetailsPage /> },
        { path: NAVIGATION_ROUTES.suppliers.base, element: <SuppliersPage /> },
        { path: NAVIGATION_ROUTES.suppliers.details.base, element: <SupplierInfoPage /> },
        { path: NAVIGATION_ROUTES.accounts.base, element: <AccountsPage /> },
        { path: NAVIGATION_ROUTES.employees.base, element: <EmployeesPage /> },
        { path: NAVIGATION_ROUTES.users.base, element: <UsersPage /> },
      ],
    },
    ...PublicRoutes,
  ]);

  return routes;
};

export default Router;
