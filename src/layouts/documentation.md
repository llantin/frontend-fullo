# Documentación de Layouts

## Estructura de Layouts

```
src/layouts/
├── BaseLayout.jsx            # Layout básico
├── MainLayout.jsx            # Layout principal (switcher)
├── HorizontalLayout.jsx      # Layout horizontal
└── VerticalLayout.jsx        # Layout vertical
```

## Layouts Implementados

### BaseLayout
```javascript
const BaseLayout = ({ children }) => {
  return <>{children}</>;
};
```
- Layout más simple - Solo wrapper de children

### MainLayout
```javascript
const MainLayout = () => {
  const { orientation } = useLayoutContext();
  return <Fragment>
    {orientation === 'vertical' && <VerticalLayout> <Outlet /></VerticalLayout>}
    {orientation === 'horizontal' && <HorizontalLayout> <Outlet /></HorizontalLayout>}
  </Fragment>;
};
```
- Layout principal con switching dinámico
- Usa context para determinar orientación
- Outlet pattern para React Router

### HorizontalLayout
```javascript
return <Fragment>
  <div className="wrapper">
    <Topbar />
    <ResponsiveNavbar />
    <div className="content-page">
      {children}
      <Footer />
    </div>
  </div>
  <Customizer />
</Fragment>;
```
- Topbar + ResponsiveNavbar + Footer
- Navegación horizontal

### VerticalLayout
```javascript
return <Fragment>
  <div className="wrapper">
    <Sidenav />
    <Topbar />
    <div className="content-page">
      {children}
      <Footer />
    </div>
  </div>
  <Customizer />
</Fragment>;
```
- Sidenav + Topbar + Footer
- Navegación vertical con sidebar

## Componentes Principales

### Topbar (`@/layouts/components/topbar/`)
- UserProfile, ThemeToggler, MessageDropdown
- CustomizerToggler, LanguageDropdown, MegaMenu
- FullscreenToggle, MonochromeThemeModeToggler

### Sidenav (`@/layouts/components/sidenav/`)
- AppMenu - Menú de navegación
- UserProfile - Perfil en sidebar

### Otros Componentes
- **Customizer** - Panel de personalización
- **Footer** - Pie de página
- **Navbar/ResponsiveNavbar** - Navegación
- **data.js** - Configuración de menús

## Context Integration

```javascript
const { orientation } = useLayoutContext();
// orientation: 'vertical' | 'horizontal'
```

## Uso en Rutas

```
PrivateRoute > MainLayout > (Vertical/Horizontal)Layout > Children
```

---

**Layouts:** 4 layouts principales  
**Switching:** Context-based (useLayoutContext)  
**Componentes:** 15+ componentes en layouts/components/