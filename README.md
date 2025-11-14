# Sistema de Gestión de Inventarios - Fullo Ferreterías S.A.C.

Sistema web para la gestión integral de inventarios, desarrollado con React y TypeScript.

## Descripción

Este sistema está diseñado para **Fullo Ferreterías S.A.C.** y proporciona funcionalidades para el control y gestión de inventarios empresariales. La aplicación permite administrar productos, categorías, usuarios, movimientos y otros aspectos relacionados con el inventario.

## Características Principales

### Gestión de Módulos del Sistema
- **Dashboard** - Página principal con estadísticas y resumen
- **Artículos** - Gestión de productos/ítems del inventario
- **Categorías** - Organización de productos por categorías
- **Inventario** - Control de stock y existencias
- **Movimientos** - Registro de entradas y salidas
- **Comprobantes** - Documentación de operaciones
- **Personas** - Gestión de contactos y proveedores
- **Usuarios** - Administración de usuarios del sistema
- **Roles** - Control de roles y permisos
- **Unidades de Medida** - Gestión de unidades (kg, m, unidades, etc.)
- **Conversiones** - Conversiones entre diferentes unidades
- **Soporte** - Sistema de contacto/soporte

### Gestión de Accesos
- **Autenticación** - Sistema de login/logout
- **Perfil de Usuario** - Gestión de perfil personal
- **Páginas de Error** - 403 (prohibido) y 404 (no encontrado)

### Interface y Navegación
- **Diseño Responsivo** - Adaptable a diferentes dispositivos
- **Layout Principal** - Sidebar y navegación estructurada
- **Formularios** - Para CRUD de todas las entidades

## Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Bootstrap + React Bootstrap
- **Charts:** Chart.js
- **State Management:** React Query + Context API
- **Routing:** React Router v6
- **Forms:** React Hook Form + Yup validation
- **HTTP Client:** Axios
- **UI Components:** React Bootstrap

## Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la construcción
npm run lint     # Ejecutar ESLint
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── contexts/           # Context providers
├── features/           # Funcionalidades por módulo
│   ├── auth/          # Autenticación
│   ├── categories/    # Gestión de categorías
│   ├── items/         # Artículos/productos
│   ├── inventory/     # Control de inventario
│   ├── movements/     # Movimientos
│   people/            # Personas/contactos
│   roles/             # Roles y permisos
│   support/           # Soporte
│   units/             # Unidades de medida
│   unit_conversions/  # Conversiones
│   receipts/          # Comprobantes
│   users/             # Usuarios del sistema
│   dashboard/         # Dashboard
│   modules/           # Módulos adicionales
├── helpers/           # Funciones utilitarias
├── layouts/           # Diseños principales
├── routes/            # Configuración de rutas
├── services/          # Servicios API
├── types/             # Definiciones TypeScript
└── views/             # Páginas y componentes
```

## Rutas del Sistema

### Rutas Protegidas (Requieren autenticación)
- `/` - Redirige a dashboard
- `/dashboard` - Dashboard principal
- `/perfil` - Perfil de usuario
- `/soporte` - Sistema de soporte
- `/roles` - Gestión de roles
- `/personas` - Gestión de personas
- `/usuarios` - Gestión de usuarios
- `/categorias` - Gestión de categorías
- `/articulos` - Gestión de artículos
- `/movimientos` - Control de movimientos
- `/comprobantes` - Gestión de comprobantes
- `/unidades-medida` - Unidades de medida
- `/conversion-unidades` - Conversiones de unidades
- `/inventario` - Control de inventario

### Rutas Públicas (Sin autenticación)
- `/sign-in` - Página de inicio de sesión
- `/reset-password` - Restablecer contraseña
- `/new-password` - Nueva contraseña
- `/error/403` - Error de acceso prohibido
- `/error/404` - Error de página no encontrada

## Configuración de Backend

- **Base URL:** `https://backend-fullo.onrender.com/api`
- **Autenticación:** JWT tokens via cookies
- **Timeout:** 30 segundos

## Características Técnicas

### Arquitectura
- **Feature-Based Architecture** - Organización por módulos
- **Lazy Loading** - Carga bajo demanda de componentes
- **Code Splitting** - Separación de bundles
- **Protected Routes** - Verificación de autenticación

### Estados y Datos
- **React Query** - Cache y sincronización de datos
- **Context API** - Estados globales (layout, notificaciones)
- **Local Storage** - Persistencia de configuraciones

### Validación
- **Yup** - Validación de esquemas
- **React Hook Form** - Manejo eficiente de formularios

## Desarrollo

### Estructura de Componentes
Cada módulo sigue el patrón:
```
src/features/{module}/
├── hooks/          # Custom hooks
├── services/       # API calls
├── components/     # Componentes específicos
└── types/          # TypeScript definitions
```

### Servicios API
Cada funcionalidad tiene su servicio correspondiente para comunicación con el backend via Axios.

## Licencia

Este proyecto es propiedad de **Fullo Ferreterías S.A.C.** y está desarrollado específicamente para sus operaciones comerciales.

---

**Desarrollado por Fullo Ferreterías S.A.C.**  
*Sistema de Gestión de Inventarios - Versión 1.0*
