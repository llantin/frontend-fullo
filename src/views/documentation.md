# Documentación de Views

## Arquitectura de Views

El sistema utiliza una arquitectura de views basada en módulos funcionales donde cada vista principal está organizada por funcionalidad. La estructura se encuentra en `src/views/`.

## Estructura Actual Confirmada

### Directorios de Views Existentes (14 módulos principales)

```
src/views/
├── apps/                    # Aplicaciones específicas
├── auth/                    # Autenticación
├── categories/              # Gestión de categorías
├── dashboards/              # Dashboards
├── error/                   # Páginas de error
├── inventory/               # Control de inventario
├── items/                   # Artículos/Productos
├── movements/               # Movimientos
├── people/                  # Personas/Contactos
├── receipts/                # Comprobantes
├── roles/                   # Roles y permisos
├── support/                 # Soporte
├── units/                   # Unidades de medida
├── unit_conversions/        # Conversiones de unidades
└── users/                   # Usuarios del sistema
```

## Patrones de Implementación Verificados

### Patrón 1: Módulo con Componentes (categories, items, etc.)
```
src/views/categories/
├── index.jsx                    # Vista principal
└── components/
    ├── AddEditModal.jsx         # Modal para crear/editar
    ├── CategoryTable.jsx        # Tabla de categorías
    └── DeleteModal.jsx          # Modal de confirmación
```

### Patrón 2: Vista Anidada (apps/users/profile)
```
src/views/apps/
└── users/
    └── profile/
        ├── index.jsx            # Vista principal
        ├── data.js              # Datos estáticos
        └── components/
            ├── Account.jsx      # Componente cuenta
            └── Profile.jsx      # Componente perfil
```

### Patrón 3: Vista con Subdirectorios (auth)
```
src/views/auth/
└── auth-1/
    ├── sign-in/
    │   └── index.jsx            # Página de login
    ├── reset-password/
    │   └── index.jsx            # Página de reset
    └── new-password/
        └── index.jsx            # Página nueva contraseña
```

## Funcionalidades por View

### Categories (`src/views/categories/`)
- **Vista principal:** `index.jsx` - Gestión de categorías con tabla y modales
- **Componentes:**
  - `CategoryTable.jsx` - Tabla de categorías
  - `AddEditModal.jsx` - Modal crear/editar
  - `DeleteModal.jsx` - Confirmación de eliminación
- **Hooks utilizados:** `useCategories`
- **Patrón:** CRUD completo con modales

### Items (`src/views/items/`)
- **Vista principal:** `index.jsx` - Gestión de artículos
- **Componentes:**
  - `ItemTable.jsx` - Tabla de artículos
  - `AddEditModal.jsx` - Modal crear/editar
  - `DeleteModal.jsx` - Confirmación de eliminación
- **Hooks utilizados:** `useItems`
- **Patrón:** CRUD completo con modales

### Auth (`src/views/auth/`)
- **Estructura:** Subdirectorio con auth-1 y múltiples páginas
- **Páginas:**
  - `sign-in/index.jsx` - Login con localStorage y navegación
  - `reset-password/index.jsx` - Solicitud de reset
  - `new-password/index.jsx` - Nueva contraseña
- **Características:** Páginas públicas, sin layout principal
- **Autenticación:** Usa localStorage para guardar usuario y token

### Apps (`src/views/apps/`)
- **Estructura:** Nested routing para apps específicas
- **Ejemplo:** `users/profile/index.jsx` - Perfil de usuario
- **Componentes:**
  - `Profile.jsx` - Información del perfil
  - `Account.jsx` - Configuración de cuenta
- **Datos:** `data.js` con datos estáticos para el perfil
- **Patrón:** Layout especial con imagen de fondo y secciones

### Users (`src/views/users/`)
- **Vista principal:** `index.jsx` - Gestión de usuarios
- **Estructura:** Similar a categories/items (debe tener componentes)

### Dashboard (`src/views/dashboards/`)
- **Estructura:** Subdirectorio dashboard
- **Vista principal:** `index.jsx`
- **Características:** Dashboard con estadísticas

### Error (`src/views/error/`)
- **Páginas de error:**
  - `403/index.jsx` - Acceso prohibido
  - `404/index.jsx` - Página no encontrada
- **Patrón:** Páginas públicas simples

### Otros Módulos
Cada módulo sigue un patrón similar:
- **inventory/** - Control de inventario
- **movements/** - Movimientos de inventario
- **people/** - Gestión de personas
- **receipts/** - Gestión de comprobantes
- **roles/** - Gestión de roles
- **support/** - Sistema de soporte
- **units/** - Unidades de medida
- **unit_conversions/** - Conversiones de unidades

## Características Técnicas Verificadas

### Imports Comunes
```javascript
// Componentes compartidos
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useCategories } from '@/features/categories/hooks/useCategories';

// React Bootstrap
import { Container, Card, CardBody, Button } from 'react-bootstrap';

// Iconos
import { TbPlus } from 'react-icons/tb';
```

### Estructura de Vistas Principales
```javascript
// Ejemplo: src/views/categories/index.jsx
const Index = () => {
  const { categories, loading, addCategory, editCategory, removeCategory } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  // Manejadores de eventos para CRUD
  const handleCreateCategory = () => { ... };
  const handleEditCategory = (category) => { ... };
  const handleDeleteCategory = (category) => { ... };
  const handleSaveCategory = async (categoryData) => { ... };
  const handleConfirmDelete = async () => { ... };

  return (
    <Container fluid>
      <PageBreadcrumb title="Categorías" subtitle="Gestionar" />
      
      <Card className="mb-3">
        <CardBody>
          <Button variant="primary" onClick={handleCreateCategory}>
            Registrar categoría
          </Button>
          
          <CategoryTable
            categories={categories}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </CardBody>
      </Card>

      {/* Modales */}
      <AddEditModal ... />
      <DeleteModal ... />
    </Container>
  );
};
```

### Autenticación (src/views/auth/)
```javascript
// Ejemplo: sign-in/index.jsx
const Index = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      if (data.status) {
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-box ...">
      <Container>
        <Card className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Formulario de login */}
          </Form>
        </Card>
      </Container>
    </div>
  );
};
```

### Perfil de Usuario (src/views/apps/users/profile/)
```javascript
const Page = () => {
    return <Container fluid>
        <PageBreadcrumb title="Mi perfil" />
        <div className="row">
            <div className="col-12">
                <article className="card overflow-hidden mb-0">
                    <div className="position-relative card-side-img" style={{
                        minHeight: 300,
                        backgroundImage: `url(${profileBg})`
                    }}>
                        {/* Imagen de fondo y overlay */}
                    </div>
                </article>
            </div>
        </div>
        <div className="px-3 mt-n4">
            <div className="row">
                <div className="col-xl-4">
                    <Profile />
                </div>
                <div className="col-xl-8">
                    <Account />
                </div>
            </div>
        </div>
    </Container>;
};
```

## Convenciones de Names

### Nombres de Archivos
- **Vista principal:** `index.jsx` en cada directorio
- **Componentes:** `{ComponentName}.jsx` en subdirectorio components
- **Datos:** `data.js` para datos estáticos

### Estructura de Carpetas
- **Módulos simples:** `{module}/index.jsx + components/`
- **Módulos anidados:** `{parent}/{child}/index.jsx`
- **Auth:** `{auth}/{variant}/{page}/index.jsx`

## Estados y Hooks

### Hooks Utilizados
- **useCategories** - Para gestión de categorías
- **useItems** - Para gestión de artículos
- **useAuth** - Para autenticación
- **Otros:** useUsers, useMovements, etc.

### Estados Locales Comunes
```javascript
const [showModal, setShowModal] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [showDelete, setShowDelete] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

## Importaciones y Dependencias

### Dependencias Externas
- **React Router:** `useNavigate` para navegación
- **React Bootstrap:** UI components
- **React Icons:** Iconografía
- **Features Hooks:** Para lógica de negocio

### Dependencias Internas
- **@/components/PageBreadcrumb:** Breadcrumbs
- **@/features/{module}/hooks:** Hooks de funcionalidades
- **@/helpers:** Funciones utilitarias

## Patrones de UX/UI

### Layout Principal
- **Container fluid** para ancho completo
- **Card** para agrupar contenido
- **PageBreadcrumb** para navegación
- **Button** para acciones principales

### Modales
- **AddEditModal** para crear/editar
- **DeleteModal** para confirmaciones
- **Estado controlado** con show/hide

### Tablas
- **Componente separado** para cada entidad
- **Props callbacks** para acciones
- **Paginación** y filtros integrados

## Navegación

### Rutas Principales
- **Protegidas:** categories, items, users, inventory, etc.
- **Públicas:** auth/*, error/*
- **Dashboard:** `/dashboard` como página principal

### Breadcrumbs
- **PageBreadcrumb** en todas las vistas protegidas
- **Title** y **subtitle** configurables

---

**Última actualización:** Basada en estructura confirmada en `src/views/`
**Total de vistas:** 14+ módulos implementados