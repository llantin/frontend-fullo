# Documentación de Helpers

Este directorio contiene funciones utilitarias y constantes para la aplicación de gestión de inventarios.

## casing.js
- `toPascalCase(value)`: Convierte una cadena a PascalCase capitalizando la primera letra de cada palabra y eliminando separadores.
- `generateInitials(name)`: Genera iniciales en mayúsculas a partir de un nombre completo.
- `abbreviatedNumber(val)`: Abreviatura números grandes (ej. 1000 → 1k, 1000000 → 1m).

## chart.js
- `getColor(v, a=1)`: Obtiene valores de color de propiedades CSS personalizadas (`--ins-*`), con transparencia alfa opcional. Retrocede a negro si no se encuentra o en renderizado del lado del servidor.
- `getFont()`: Obtiene la familia de fuentes del cuerpo del documento. Retorna indefinido en renderizado del lado del servidor.

## color.js
- `getColor(v, a=1)`: Obtiene valores de color de propiedades CSS personalizadas (`--ins-*`), con transparencia alfa opcional.

## debounce.js
- `debounce(fn, delay)`: Retorna una versión debounced de la función que retrasa la ejecución hasta que haya pasado el retraso especificado desde la última llamada.

## file.js
- `formatBytes(bytes, decimals=2)`: Formatea valores de bytes en tamaños legibles por humanos (ej. Bytes, KB, MB).

## generators.js
- `generateRandomEChartData(dataName)`: Genera datos aleatorios basados en porcentajes para ECharts a partir de un arreglo de nombres.
- `getCurrentMonthRange()`: Retorna un arreglo con las fechas de inicio y fin del mes actual.

## index.js
Constantes para la aplicación:
- `currency`: 'S/. '
- `currentYear`: Año actual como número.
- `appName`: 'Gestión de Inventarios'
- `appTitle`: 'Gestión de Inventarios - Fullo Ferreterías S.A.C.'
- `appDescription`: 'Gestión de Inventarios desarrollado por Fullo Ferreterías S.A.C.'
- `author`: 'Fullo Ferreterías S.A.C.'
- `authorWebsite`: 'https://coderthemes.com/'
- `authorContact`: ''
- `basePath`: ''

## layout.js
- `toggleAttribute(attribute, value, remove, tag='html')`: Alterna un atributo en el elemento HTML especificado (por defecto: html).
- `easeInOutQuad(t, b, c, d)`: Función de easing cuadrática para animaciones.
- `scrollToElement(element, to, duration)`: Desplaza suavemente un elemento a una posición especificada durante una duración dada.