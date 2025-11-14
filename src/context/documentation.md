# Documentación de Context

Este directorio contiene contextos de React para gestionar el estado global de la aplicación.

## useKanbanContext.jsx
- `KanbanProvider`: Proveedor de contexto para el tablero Kanban, maneja secciones y tareas.
- `useKanbanContext`: Hook para acceder al estado y funciones del Kanban.
- Esquemas de validación: `kanbanTaskSchema` (para tareas), `kanbanSectionSchema` (para secciones).
- Funciones principales: agregar/editar/eliminar tareas y secciones, drag and drop, manejo de modales y formularios.

## useLayoutContext.jsx
- `LayoutProvider`: Proveedor de contexto para configuraciones de layout (tema, skin, orientación, colores, tamaños).
- `useLayoutContext`: Hook para acceder y modificar configuraciones de layout.
- Funciones para cambiar: skin, tema, orientación, color de topbar, tamaño y color de sidenav, posición y ancho de layout, modo monocromo, etc.

## useNotificationContext.jsx
- `NotificationProvider`: Proveedor de contexto para mostrar notificaciones toast.
- `useNotificationContext`: Hook para acceder a la función de mostrar notificaciones.
- `showNotification`: Muestra una notificación con título, mensaje, variante y retraso opcional.