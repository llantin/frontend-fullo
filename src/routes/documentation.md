# Documentación del Sistema de Rutas

## Configuración Actual

El sistema utiliza **React Router v6** con lazy loading. La configuración exacta está en `src/routes/index.jsx`:

```javascript
import { lazy } from 'react';
import { Navigate } from 'react-router';
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from '@/layouts/MainLayout';
```

## Importaciones de Componentes

```javascript
// Dashboard
const Dashboard = lazy(() => import('@/views/dashboards/dashboard'));

// Autenticación (auth-1)
const Auth1SignIn = lazy(() => import('@/views/auth/auth-1/sign-in'));
const Auth1ResetPassword = lazy(() => import('@/views/auth/auth-1/reset-password'));
const Auth1NewPassword = lazy(() => import('@/views/auth/auth-1/new-password'));

// Errores
const Error403 = lazy(() => import('@/views/error/403'));
const Error404 = lazy(() => import('@/views/error/404'));

// Módulos (11 módulos principales)
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
```

## Estructura de Rutas Implementada

### Rutas de Autenticación (3 rutas)
```javascript
const authRoutes = [
  { path: '/sign-in', element: <Auth1SignIn /> },
  { path: '/reset-password', element: <Auth1ResetPassword /> },
  { path: '/new-password', element: <Auth1NewPassword /> },
];
```

### Rutas de Errores (2 rutas)
```javascript
const errorRoutes = [
  { path: '/error/403', element: <Error403 /> },
  { path: '/error/404', element: <Error404 /> },
];
```

### Rutas de Dashboard (1 ruta)
```javascript
const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
];
```

### Rutas de Módulos (11 rutas)
```javascript
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
```

## Jerarquía Real de Protección

```javascript
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
```

**Nota:** Las rutas dashboard y apps se combinan en el mismo nivel bajo MainLayout.

## Export de Rutas Implementado

```javascript
export const routes = [
  ...allRoutes,
  ...authRoutes,
  ...errorRoutes,
  ...notFoundRoute,
];
```

## Ruta Catch-All

```javascript
const notFoundRoute = [
  { path: '*', element: <Navigate to="/error/404" replace /> },
];
```

## Comportamiento Real del Sistema

### Rutas Públicas (Sin PrivateRoute)
- `/sign-in`
- `/reset-password`
- `/new-password`
- `/error/403`
- `/error/404`

### Rutas Protegidas (Con PrivateRoute + MainLayout)
- `/` → Redirige automáticamente a `/dashboard`
- `/dashboard`
- `/perfil`
- `/soporte`
- `/roles`
- `/personas`
- `/usuarios`
- `/categorias`
- `/articulos`
- `/movimientos`
- `/comprobantes`
- `/unidades-medida`
- `/conversion-unidades`
- `/inventario`

### Rutas No Definidas
Cualquier ruta que no coincida con las anteriores redirige a `/error/404`.

## Componentes de Layout Utilizados

- **PrivateRoute:** @/components/PrivateRoute
- **MainLayout:** @/layouts/MainLayout
- **Navegación:** React Router Navigate component

## Total de Rutas del Sistema

- **3 rutas** de autenticación
- **2 rutas** de errores
- **1 ruta** de dashboard
- **11 rutas** de módulos
- **1 ruta** catch-all
- **Total:** **18 rutas** activas

---

**Nota:** Esta documentación refleja la implementación exacta actual. Cualquier cambio en `src/routes/index.jsx` debe reflejarse aquí.