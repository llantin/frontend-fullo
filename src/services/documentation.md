# Documentación del Servicio API

## Configuración Base

El sistema utiliza **Axios** para comunicación con el backend:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-fullo.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
    timeout: 30000,
});
```

### Interceptores

```javascript
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});
```

## Servicios Principales

### Authentication (`/auth`)

```javascript
const login = (credentials) => api.post('/auth/login', credentials);
const logout = () => api.post('/auth/logout');
const resetPassword = (email) => api.post('/auth/reset-password', { email });
```

### Products (`/items`)

```javascript
const getItems = (params) => api.get('/items', { params });
const createItem = (itemData) => api.post('/items', itemData);
const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData);
const deleteItem = (id) => api.delete(`/items/${id}`);
```

### Categories (`/categories`)

```javascript
const getCategories = () => api.get('/categories');
const createCategory = (categoryData) => api.post('/categories', categoryData);
const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData);
const deleteCategory = (id) => api.delete(`/categories/${id}`);
```

### Inventory (`/inventory`)

```javascript
const getInventory = () => api.get('/inventory');
const getProductHistory = (productId) => api.get(`/inventory/${productId}/history`);
const adjustStock = (productId, adjustment) => api.post(`/inventory/${productId}/adjust`, adjustment);
```

### Movements (`/movements`)

```javascript
const getMovements = (params) => api.get('/movements', { params });
const createMovement = (movementData) => api.post('/movements', movementData);
const updateMovement = (id, movementData) => api.put(`/movements/${id}`, movementData);
const deleteMovement = (id) => api.delete(`/movements/${id}`);
```

### People (`/people`)

```javascript
const getPeople = (params) => api.get('/people', { params });
const createPerson = (personData) => api.post('/people', personData);
const updatePerson = (id, personData) => api.put(`/people/${id}`, personData);
const deletePerson = (id) => api.delete(`/people/${id}`);
```

### Users (`/users`)

```javascript
const getUsers = (params) => api.get('/users', { params });
const createUser = (userData) => api.post('/users', userData);
const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
const deleteUser = (id) => api.delete(`/users/${id}`);
```

### Roles (`/roles`)

```javascript
const getRoles = () => api.get('/roles');
const createRole = (roleData) => api.post('/roles', roleData);
const updateRole = (id, roleData) => api.put(`/roles/${id}`, roleData);
const deleteRole = (id) => api.delete(`/roles/${id}`);
```

### Units (`/units`)

```javascript
const getUnits = () => api.get('/units');
const createUnit = (unitData) => api.post('/units', unitData);
const updateUnit = (id, unitData) => api.put(`/units/${id}`, unitData);
const deleteUnit = (id) => api.delete(`/units/${id}`);
```

### Unit Conversions (`/unit-conversions`)

```javascript
const getUnitConversions = () => api.get('/unit-conversions');
const createConversion = (conversionData) => api.post('/unit-conversions', conversionData);
const updateConversion = (id, conversionData) => api.put(`/unit-conversions/${id}`, conversionData);
const deleteConversion = (id) => api.delete(`/unit-conversions/${id}`);
```

### Receipts (`/receipts`)

```javascript
const getReceipts = (params) => api.get('/receipts', { params });
const createReceipt = (receiptData) => api.post('/receipts', receiptData);
const generateReceiptPDF = (id) => api.get(`/receipts/${id}/pdf`, { responseType: 'blob' });
```

### Support (`/support`)

```javascript
const sendSupport = (supportData) => api.post('/support', supportData);
```

### Dashboard (`/dashboard`)

```javascript
const getStats = () => api.get('/dashboard/stats');
const getChartData = () => api.get('/dashboard/charts');
```

## Paginación

### Parámetros
```javascript
const params = {
    page: 1,        // Página actual
    limit: 20,      // Elementos por página
    sort: 'name',   // Campo de ordenamiento
    order: 'asc',   // Dirección: 'asc' o 'desc'
    search: 'texto' // Búsqueda de texto
};
```

### Estructura de Respuesta
```javascript
{
    "success": true,
    "data": [...],
    "pagination": {
        "current_page": 1,
        "per_page": 20,
        "total": 150,
        "total_pages": 8
    }
}
```

## Autenticación

- **JWT Token** enviado automáticamente por cookies
- **Configuración:** `withCredentials: true`
- **Timeout:** 30 segundos

## Manejo de Errores

```javascript
try {
    const response = await api.post('/items', itemData);
    return response.data;
} catch (error) {
    console.error('Error:', error);
    throw error;
}
```

**Códigos comunes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

## Ejemplos de Uso

### Crear Producto
```javascript
const createProduct = async (productData) => {
    const response = await api.post('/items', {
        name: productData.name,
        sku: productData.sku,
        price: productData.price,
        category_id: productData.categoryId,
        unit_id: productData.unitId,
        description: productData.description,
        stock: productData.stock || 0
    });
    return response.data;
};
```

### Subir Archivo
```javascript
const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData);
    return response.data;
};
```

---

**Base URL:** `https://backend-fullo.onrender.com/api`  
**Timeout:** 30 segundos  
**Autenticación:** JWT via cookies