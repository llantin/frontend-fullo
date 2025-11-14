# Documentación de Components

## Estructura de Components

```
src/components/
├── AppLogo.jsx                    # Logo de la aplicación
├── AppWrapper.jsx                 # Provider wrapper
├── cards/                         # Componentes de tarjetas
├── CustomApexChart.jsx           # Charts con ApexCharts
├── CustomChartJs.jsx             # Charts con Chart.js
├── CustomQuill.jsx               # Rich text editor
├── FileExtensionWithPreview.jsx  # Preview de archivos
├── FileUploader.jsx              # Upload de archivos
├── Loader.jsx                    # Loading spinner
├── NestableList.jsx              # Lista draggable
├── OTPInput.jsx                  # Input OTP
├── PageBreadcrumb.jsx            # Breadcrumbs
├── PageMetaData.jsx              # Meta datos de página
├── PasswordInputWithStrength.jsx # Password con strength
├── PrivateRoute.jsx              # Ruta protegida
├── Rating.jsx                    # Componente rating
├── Spinner.jsx                   # Spinner custom
├── table/                        # Componentes de tabla
└── TouchSpinInput.jsx            # Input numérico
```

## Componentes Principales

### Core Components

**AppLogo**
- Logo con dark/light mode
- Links a página principal
- Height configurable

**AppWrapper**
- Provider wrapper con context
- LayoutProvider + NotificationProvider

**PrivateRoute**
- Route protection
- Verifica token en localStorage
- Redirect a `/sign-in` si no autenticado

**PageBreadcrumb**
- Breadcrumbs con navegación
- Integración con PageMetaData
- Título y subtítulo dinámicos

**PageMetaData**
- Meta tags dinámicos
- Title formatting: `{title} - Inventario Fullo`

### File Handling

**FileUploader**
- Drag & drop con react-dropzone
- Preview de imágenes
- File validation y size limits
- Upload notifications

**FileExtensionWithPreview**
- SVG icon para extensiones
- Color dinámico por tipo

### Forms & Inputs

**OTPInput**
- Input de 6 dígitos para OTP
- Auto-focus entre campos
- Validación numérica

**PasswordInputWithStrength**
- Password con indicador de strength
- 4 niveles de validación
- Icono opcional

**TouchSpinInput**
- Input numérico con +/- buttons
- Min/max validation
- Size variants (sm, lg)

### Charts

**CustomChartJs**
- Wrapper de Chart.js
- Context integration (skin, theme)
- Suspense loading

**CustomApexChart**
- Wrapper de ApexCharts
- Dynamic options
- Suspense loading

### Tables & Lists

**NestableList**
- Lista draggable con @dnd-kit
- Nested items con depth
- Drag & drop reorder

**table/ components:**
- DataTable - Tabla principal
- DeleteConfirmationModal - Modal de confirmación
- TablePagination - Paginación

### Cards & UI

**cards/ components:**
- ChatCard - Card de chat
- ComponentCard - Card genérica
- data.js - Datos para cards

### Loaders & Status

**Loader**
- Spinner con Bootstrap
- Configurable height/width
- Overlay option

**Spinner**
- Spinner custom component
- Variants: bordered/grow
- Size y color options

**Rating**
- Rating component con estrellas
- Soporte half-stars
- Configurable className

### Text Editor

**CustomQuill**
- Rich text editor con Quill
- Custom icons con react-icons
- Lazy loading

## Usage Examples

### File Upload
```javascript
const [files, setFiles] = useState([]);
<FileUploader
  files={files}
  setFiles={setFiles}
  onUpload={handleUpload}
  maxFileCount={5}
  accept={{ 'image/*': [] }}
/>
```

### Protected Route
```javascript
// En routes
<Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
```

### Chart Component
```javascript
<CustomChartJs
  type="line"
  height="300"
  getOptions={getChartOptions}
/>
```

### Password Input
```javascript
<PasswordInputWithStrength
  password={password}
  setPassword={setPassword}
  label="Contraseña"
  showIcon
/>
```

### OTP Input
```javascript
<OTPInput
  code={otpCode}
  setCode={setOtpCode}
  label="Código OTP"
/>
```

## Dependencies

### External Libraries
- **react-dropzone** - File uploads
- **@dnd-kit** - Drag & drop
- **react-apexcharts** - ApexCharts
- **chart.js** - Chart.js
- **react-quill** - Rich text editor
- **clsx** - ClassName utility

### Internal Dependencies
- **@/context/useLayoutContext** - Layout context
- **@/context/useNotificationContext** - Notifications
- **@/helpers/file** - File utilities
- **react-router** - Routing

---

**Total:** 17+ componentes principales  
**Subdirectorios:** cards/, table/  
**Contextos:** Layout, Notification