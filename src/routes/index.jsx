import { lazy } from 'react';
import { Navigate } from 'react-router';
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from '@/layouts/MainLayout';

// Rutas de dashboard
const Dashboard = lazy(() => import('@/views/dashboards/dashboard'));

// Rutas de autenticación
const Auth1SignIn = lazy(() => import('@/views/auth/auth-1/sign-in'));
const Auth1ResetPassword = lazy(() => import('@/views/auth/auth-1/reset-password'));
const Auth1NewPassword = lazy(() => import('@/views/auth/auth-1/new-password'));

// Rutas de errores
const Error403 = lazy(() => import('@/views/error/403'));
const Error404 = lazy(() => import('@/views/error/404'));

// Rutas de módulos
const People = lazy(() => import('@/views/people'));
const Users = lazy(() => import('@/views/users'));
const Categories = lazy(() => import('@/views/categories'));
const Items = lazy(() => import('@/views/items'));
const Support = lazy(() => import('@/views/support'));
const Roles = lazy(() => import('@/views/roles'));
const Profile = lazy(() => import('@/views/apps/users/profile'));
const Movements = lazy(() => import('@/views/movements'));
const Receipts = lazy(() => import('@/views/receipts'));
const Units = lazy(() => import('@/views/units'));
const UnitConversions = lazy(() => import('@/views/unit_conversions'));
const Inventory = lazy(() => import('@/views/inventory'));

const authRoutes = [
  { path: '/sign-in', element: <Auth1SignIn /> },
  { path: '/reset-password', element: <Auth1ResetPassword /> },
  { path: '/new-password', element: <Auth1NewPassword /> },
];

const errorRoutes = [
  { path: '/error/403', element: <Error403 /> },
  { path: '/error/404', element: <Error404 /> },
];

const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
];

const appsRoutes = [
  { path: '/perfil', element: <Profile /> },
  { path: '/soporte', element: <Support /> },
  { path: '/roles', element: <Roles /> },
  { path: '/personas', element: <People /> },
  { path: '/usuarios', element: <Users /> },
  { path: '/categorias', element: <Categories /> },
  { path: '/articulos', element: <Items /> },
  { path: '/movimientos', element: <Movements /> },
  { path: '/comprobantes', element: <Receipts /> },
  { path: '/unidades-medida', element: <Units /> },
  { path: '/conversion-unidades', element: <UnitConversions /> },
  { path: '/inventario', element: <Inventory /> },
];

const allRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          ...dashboardRoutes,
          ...appsRoutes,
        ],
      },
    ],
  },
];

// Redireccion a error 404 al no encontrar ruta
const notFoundRoute = [
  { path: '*', element: <Navigate to="/error/404" replace /> },
];

// Exportar rutas
export const routes = [
  ...allRoutes,
  ...authRoutes,
  ...errorRoutes,
  ...notFoundRoute,
];