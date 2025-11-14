# Documentación de Features

## Arquitectura de Features

El sistema utiliza una arquitectura basada en features donde cada módulo funcional está organizado de forma independiente. La estructura se encuentra en `src/features/`.

## Estructura Actual Confirmada

### Directorios de Features Existentes (14 módulos)

```
src/features/
├── auth/              # Autenticación
├── categories/        # Gestión de categorías
├── dashboard/         # Dashboard/Estadísticas
├── inventory/         # Control de inventario
├── items/             # Artículos/Productos
├── modules/           # Módulos adicionales
├── movements/         # Movimientos
├── people/            # Personas/Contactos
├── receipts/          # Comprobantes
├── roles/             # Roles y permisos
├── support/           # Soporte
├── units/             # Unidades de medida
├── unit_conversions/  # Conversiones de unidades
└── users/             # Usuarios del sistema
```

## Patrones de Implementación Verificados

### Patrón 1: Módulo Completo (Items)
```
src/features/items/
├── index.js           # Re-exportaciones
├── hooks/
│   └── useItems.js    # Custom hooks
└── services/
    └── itemService.js # API services
```

**Contenido de `index.js`:**
```javascript
export * from "./services/itemService";
export * from "./hooks/useItems";
```

### Patrón 2: Módulo con Servicios (Dashboard)
```
src/features/dashboard/
├── index.js
└── services/
    └── dashboardService.js
```

### Patrón 3: Módulo con Hooks (Auth)
```
src/features/auth/
├── hooks/
│   └── useAuth.js
└── services/
    └── authService.js
```

## Funcionalidades por Módulo

### Auth (`src/features/auth/`)
- **Hook:** `useAuth.js` - Manejo de usuario y logout
- **Servicio:** `authService.js` - API de autenticación

### Items (`src/features/items/`)
- **Hook:** `useItems.js` - Lógica de negocio para artículos
- **Servicio:** `itemService.js` - API para artículos/productos
- **Re-exportación:** `index.js`

### Dashboard (`src/features/dashboard/`)
- **Servicio:** `dashboardService.js` - API para estadísticas
- **Re-exportación:** `index.js`

### Categories (`src/features/categories/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Inventory (`src/features/inventory/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Movements (`src/features/movements/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### People (`src/features/people/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Receipts (`src/features/receipts/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Roles (`src/features/roles/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Support (`src/features/support/`)
- **Estructura:** Solo Service (confirmado por index.js)

### Units (`src/features/units/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Unit Conversions (`src/features/unit_conversions/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Users (`src/features/users/`)
- **Estructura:** Hook + Service (confirmado por index.js)
- **Re-exportación:** `index.js`

### Modules (`src/features/modules/`)
- **Estructura:** Solo Service (confirmado por index.js)

## Servicios API Confirmados

### ItemService (`src/features/items/services/itemService.js`)
```javascript
import api from "@/services/api";

export const getItems = async () => {
    const { data } = await api.get("/items");
    return data.items;
};

export const createItem = async (itemData) => {
    const { data } = await api.post("/items", itemData);
    return data;
};

export const updateItem = async (id, updatedData) => {
    updatedData.append('_method', 'PUT');
    const { data } = await api.post(`/items/${id}`, updatedData);
    return data;
};

export const deleteItem = async (id) => {
    const { data } = await api.delete(`/items/${id}`);
    return data;
};
```

### Auth Hook (`src/features/auth/hooks/useAuth.js`)
```javascript
export const useAuthUser = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, []);
    
    return user;
}

export const useLogout = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/sign-in");
    };
    
    return logout;
};
```

## Convenciones de Names

### Nombres de Archivos
- **Hooks:** `use{FeatureName}.js` (ej: `useItems.js`, `useAuth.js`)
- **Servicios:** `{feature}Service.js` (ej: `itemService.js`, `authService.js`)
- **Índices:** `index.js` en cada módulo

### Nombres de Funciones
- **Hooks:** `use{Action}` (ej: `useAuthUser`, `useLogout`)
- **Servicios:** `{action}{Entity}` (ej: `getItems`, `createItem`, `updateItem`, `deleteItem`)

## Importaciones y Uso

### Ejemplo de Importación
```javascript
// Importar desde un módulo específico
import { getItems, createItem, updateItem, deleteItem } from '@/features/items';
import { useAuthUser, useLogout } from '@/features/auth';

// Uso en componente
const MyComponent = () => {
    const user = useAuthUser();
    const logout = useLogout();
    
    const handleCreateItem = async (itemData) => {
        await createItem(itemData);
    };
};
```

## Backend API

Todos los servicios utilizan el cliente API configurado en `@/services/api`:

- **Base URL:** `https://backend-fullo.onrender.com/api`
- **Cliente:** Axios con interceptors
- **Autenticación:** JWT via cookies

## Re-exportaciones

La mayoría de módulos incluyen `index.js` para facilitar las importaciones:

```javascript
// src/features/items/index.js
export * from "./services/itemService";
export * from "./hooks/useItems";
```

Esto permite importar directamente desde el módulo sin especificar la ruta interna:

```javascript
// Correcto
import { getItems } from '@/features/items';

// Incorrecto
import { getItems } from '@/features/items/services/itemService';
```

## Dependencias entre Módulos

- **Todos los servicios** dependen de `@/services/api`
- **Auth hooks** dependen de `react-router` para navegación
- **Algunos módulos** pueden depender de otros módulos (ej: movements puede depender de items)

## Notas Importantes

1. **No todos los módulos siguen el mismo patrón** - algunos tienen hooks, otros solo servicios
2. **Auth es único** - no tiene `index.js` como otros módulos
3. **Support y Modules** - solo tienen servicios
4. **Update method** - items usa `_method: 'PUT'` en POST requests
5. **LocalStorage** - auth guarda datos en localStorage

---

**Última actualización:** Basada en estructura confirmada en `src/features/`
**Total de módulos:** 14 features implementados