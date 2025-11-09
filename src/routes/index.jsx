import { lazy } from 'react';
import { Navigate } from 'react-router';
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from '@/layouts/MainLayout';
import SocialFeed from "@/views/apps/social-feed";

// Dashboards
const Dashboard = lazy(() => import('@/views/dashboards/dashboard'));
const Dashboard2 = lazy(() => import('@/views/dashboards/dashboard2'));

// Pages
const Faq = lazy(() => import('@/views/pages/faq'));
const Pricing = lazy(() => import('@/views/pages/pricing'));
const EmptyPage = lazy(() => import('@/views/pages/empty-page'));
const Timeline = lazy(() => import('@/views/pages/timeline'));
const SearchResults = lazy(() => import('@/views/pages/search-results'));
const ComingSoon = lazy(() => import('@/views/other-pages/coming-soon'));
const TermsConditions = lazy(() => import('@/views/pages/terms-conditions'));
const Sitemap = lazy(() => import('@/views/pages/sitemap'));

// Auth
const Auth1SignIn = lazy(() => import('@/views/auth/auth-1/sign-in'));
const Auth1SignUp = lazy(() => import('@/views/auth/auth-1/sign-up'));
const Auth1ResetPassword = lazy(() => import('@/views/auth/auth-1/reset-password'));
const Auth1NewPassword = lazy(() => import('@/views/auth/auth-1/new-password'));
const Auth1TwoFactor = lazy(() => import('@/views/auth/auth-1/two-factor'));
const Auth1LockScreen = lazy(() => import('@/views/auth/auth-1/lock-screen'));
const Auth1SuccessMail = lazy(() => import('@/views/auth/auth-1/success-mail'));
const Auth1LoginPin = lazy(() => import('@/views/auth/auth-1/login-pin'));
const Auth1DeleteAccount = lazy(() => import('@/views/auth/auth-1/delete-account'));
const Auth2SignIn = lazy(() => import('@/views/auth/auth-2/sign-in'));
const Auth2SignUp = lazy(() => import('@/views/auth/auth-2/sign-up'));
const Auth2ResetPassword = lazy(() => import('@/views/auth/auth-2/reset-password'));
const Auth2NewPassword = lazy(() => import('@/views/auth/auth-2/new-password'));
const Auth2TwoFactor = lazy(() => import('@/views/auth/auth-2/two-factor'));
const Auth2LockScreen = lazy(() => import('@/views/auth/auth-2/lock-screen'));
const Auth2SuccessMail = lazy(() => import('@/views/auth/auth-2/success-mail'));
const Auth2LoginPin = lazy(() => import('@/views/auth/auth-2/login-pin'));
const Auth2DeleteAccount = lazy(() => import('@/views/auth/auth-2/delete-account'));

// Error
const Error400 = lazy(() => import('@/views/error/400'));
const Error401 = lazy(() => import('@/views/error/401'));
const Error403 = lazy(() => import('@/views/error/403'));
const Error404 = lazy(() => import('@/views/error/404'));
const Error408 = lazy(() => import('@/views/error/408'));
const Error500 = lazy(() => import('@/views/error/500'));
const Maintenance = lazy(() => import('@/views/other-pages/maintenance'));

// Rutas de sistema de inventarios
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



const authRoutes = [{
  path: '/sign-in',
  element: <Auth1SignIn />
}, {
  path: '/auth-1/sign-up',
  element: <Auth1SignUp />
}, {
  path: '/reset-password',
  element: <Auth1ResetPassword />
}, {
  path: '/new-password',
  element: <Auth1NewPassword />
}, {
  path: '/auth-1/two-factor',
  element: <Auth1TwoFactor />
}, {
  path: '/auth-1/lock-screen',
  element: <Auth1LockScreen />
}, {
  path: '/auth-1/success-mail',
  element: <Auth1SuccessMail />
}, {
  path: '/auth-1/login-pin',
  element: <Auth1LoginPin />
}, {
  path: '/auth-1/delete-account',
  element: <Auth1DeleteAccount />
}, {
  path: '/auth-2/sign-in',
  element: <Auth2SignIn />
}, {
  path: '/auth-2/sign-up',
  element: <Auth2SignUp />
}, {
  path: '/auth-2/reset-password',
  element: <Auth2ResetPassword />
}, {
  path: '/auth-2/new-password',
  element: <Auth2NewPassword />
}, {
  path: '/auth-2/two-factor',
  element: <Auth2TwoFactor />
}, {
  path: '/auth-2/lock-screen',
  element: <Auth2LockScreen />
}, {
  path: '/auth-2/success-mail',
  element: <Auth2SuccessMail />
}, {
  path: '/auth-2/login-pin',
  element: <Auth2LoginPin />
}, {
  path: '/auth-2/delete-account',
  element: <Auth2DeleteAccount />
}];

const errorRoutes = [{
  path: '/error/400',
  element: <Error400 />
}, {
  path: '/error/401',
  element: <Error401 />
}, {
  path: '/error/403',
  element: <Error403 />
}, {
  path: '/error/404',
  element: <Error404 />
}, {
  path: '/error/408',
  element: <Error408 />
}, {
  path: '/error/500',
  element: <Error500 />
}];

const otherPagesRoutes = [{
  path: '/coming-soon',
  element: <ComingSoon />
}, {
  path: '/maintenance',
  element: <Maintenance />
}];

const dashboardRoutes = [{
  path: '/dashboard',
  element: <Dashboard />
}, {
  path: '/dashboard2',
  element: <Dashboard2 />
}];

const appsRoutes = [{
  path: '/perfil',
  element: <Profile />
}, {
  path: '/soporte',
  element: <Support />
}, {
  path: '/roles',
  element: <Roles />
}, {
  path: '/personas',
  element: <People />
}, {
  path: '/usuarios',
  element: <Users />
},{
  path: '/categorias',
  element: <Categories />
},{
  path: '/articulos',
  element: <Items />
},{
  path: '/movimientos',
  element: <Movements />
},{
  path: '/comprobantes',
  element: <Receipts />
},{
  path: '/unidades-medida',
  element: <Units />
},{
  path: '/conversion-unidades',
  element: <UnitConversions />
},{
  path: '/inventario',
  element: <Inventory />
}];

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
        ]
      }
    ]
  }
];

const otherRoutes = [...authRoutes, ...errorRoutes, ...otherPagesRoutes];
export const routes = [...allRoutes, ...otherRoutes];