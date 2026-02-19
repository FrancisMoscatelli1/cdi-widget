# CDI Widget - AngularJS

Widget de monitoreo y control para sistemas CDI de EFAISA. Aplicación web AngularJS completamente responsive que permite visualizar el estado de líneas y entradas en tiempo real, así como ejecutar comandos de control del sistema.

## ✨ Características

- ✅ Monitoreo en tiempo real de líneas de detección
- ✅ Visualización del estado de entradas del sistema
- ✅ Panel de control con comandos ACK, Reset y Test
- ✅ Interfaz multiidioma (ES/EN/PT/IT)
- ✅ Autenticación de usuarios
- ✅ Actualizaciones automáticas (polling 2.5s)
- ✅ Indicadores de estado (batería, alimentación, red)
- ✅ Optimizado para prevenir flickering
- ✅ 100% Responsive (Desktop/Tablet/Mobile)
- ✅ Modales y loaders

---

## 🔀 Versiones Disponibles

Este proyecto incluye **dos implementaciones** del mismo widget:

### 📦 AngularJS (Producción) - `index.html`
- ✅ **Arquitectura modular** con directiva, servicio y controlador
- ✅ **Reutilizable** como componente en apps AngularJS
- ✅ **Recomendado para producción** e integración en sistemas existentes
- ✅ Archivos: `js/cdi-widget.*.js`, `templates/cdi-widget.html`

### 🎨 Vanilla JS (Testing/Demo) - `test.html`
- ✅ **Sin dependencias** de frameworks
- ✅ **Archivo único** (HTML + CSS + JS todo en uno)
- ✅ **Ideal para demos** y pruebas rápidas sin backend
- ✅ Se puede abrir directamente en el navegador

**💡 Recomendación:** Usa `index.html` (AngularJS) para integrar en tu aplicación. Usa `test.html` (Vanilla JS) solo para testing local y demos.

---

## 📋 Tabla de Contenidos

- [Versiones Disponibles](#-versiones-disponibles)
- [Inicio Rápido](#-inicio-rápido)
- [3 Formas de Usar el Widget](#-3-formas-de-usar-el-widget)
- [Instalación Detallada](#-instalación-detallada)
- [Uso como Directiva](#-uso-como-directiva-recomendado)
- [API Requerida](#-api-requerida)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Personalización](#-personalización)
- [Troubleshooting & Debug](#-troubleshooting--debug)
- [Ejemplos](#-ejemplos)

---

## 🚀 Inicio Rápido

### Opción más rápida: Ver demo con Vanilla JS

Abre este archivo en tu navegador:
```
test.html
```

⚠️ **Nota:** `test.html` es una versión **Vanilla JavaScript** (sin framework) del widget, perfecta para testing y demos sin necesidad de API.

### Con tu propia API (AngularJS)

```
index.html?apiDomain=http://tu-api.com&userId=123&code=abc123&language=es
```

✅ **Nota:** `index.html` es la versión **AngularJS** (recomendada para producción)

---

## 🎯 3 Formas de Usar el Widget

### 1️⃣ Como Directiva AngularJS (RECOMENDADO)

La forma más limpia y reutilizable:

```html
<cdi-widget 
    api-domain="http://api.ejemplo.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

**Setup:**
```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<!-- CDI Widget -->
<script src="js/cdi-widget.module.js"></script>
<script src="js/cdi-widget.service.js"></script>
<script src="js/cdi-widget.controller.js"></script>
<script src="js/cdi-widget.directive.js"></script>
<link rel="stylesheet" href="css/cdi-widget.css">

<script>
    angular.module('myApp', ['cdiWidget']);
</script>
```

**Ver ejemplo:** [index.html](index.html)

---

### 2️⃣ Standalone Vanilla JS (Sin API - Para pruebas)

Abre directamente en el navegador:
```
test.html
```

⚠️ **Importante:** Este archivo usa **Vanilla JavaScript puro** (sin AngularJS), ideal para:
- ✅ Testing sin backend
- ✅ Desarrollo front-end aislado
- ✅ Demos y presentaciones
- ✅ Pruebas rápidas sin dependencias

**No requiere:** AngularJS, npm, ni servidor web

---

### 3️⃣ URL Parameters (Vanilla JS)

```
test.html?apiDomain=http://api.com&userId=123&code=abc123&language=es
```

✅ **Nota:** `test.html` usa **Vanilla JS** con la versión standalone del widget.
Parámetros disponibles:
- `apiDomain` - URL base de tu API (requerido)
- `userId` - ID del usuario (requerido)
- `code` - Código de autenticación (requerido)
- `language` - Idioma: es, en, pt, it (opcional, default: es)

---

## 📦 Instalación Detallada

### 1. Copiar archivos a tu proyecto

```
tu-proyecto/
└── widgets/
    └── cdi-widget/
        ├── js/
        │   ├── cdi-widget.module.js
        │   ├── cdi-widget.service.js
        │   ├── cdi-widget.controller.js
        │   └── cdi-widget.directive.js
        ├── templates/
        │   └── cdi-widget.html
        ├── css/
        │   └── cdi-widget.css
        └── assets/
            └── icons/
```

### 2. Incluir scripts en tu HTML

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>Mi Aplicación</title>
    
    <!-- AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

    <!-- CDI Widget -->
    <script src="widgets/cdi-widget/js/cdi-widget.module.js"></script>
    <script src="widgets/cdi-widget/js/cdi-widget.service.js"></script>
    <script src="widgets/cdi-widget/js/cdi-widget.controller.js"></script>
    <script src="widgets/cdi-widget/js/cdi-widget.directive.js"></script>
    <link rel="stylesheet" href="widgets/cdi-widget/css/cdi-widget.css">
</head>
<body>
    <!-- Tu contenido -->
</body>
</html>
```

### 3. Agregar módulo a tu app

```javascript
angular.module('myApp', ['cdiWidget']);
```

### 4. Usar en tu HTML

```html
<cdi-widget 
    api-domain="http://tu-api.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

---

## 🎨 Uso como Directiva (RECOMENDADO)

### Atributos de la Directiva

| Atributo      | Tipo    | Requerido | Descripción |
|---------------|---------|-----------|-------------|
| `api-domain`  | string  | ✅ Sí    | URL base de tu API |
| `user-id`     | number  | ✅ Sí    | ID del usuario |
| `user-code`   | string  | ✅ Sí    | Código de autenticación |
| `language`    | string  | ❌ No    | es, en, pt, it (default: es) |

### Ejemplo Completo

```html
<!DOCTYPE html>
<html ng-app="miApp">
<head>
    <meta charset="UTF-8">
    <title>Dashboard CDI</title>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="cdi-widget/js/cdi-widget.module.js"></script>
    <script src="cdi-widget/js/cdi-widget.service.js"></script>
    <script src="cdi-widget/js/cdi-widget.controller.js"></script>
    <script src="cdi-widget/js/cdi-widget.directive.js"></script>
    <link rel="stylesheet" href="cdi-widget/css/cdi-widget.css">
    
    <style>
        .dashboard {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            padding: 20px;
        }
        
        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body ng-controller="MiController">
    <div class="dashboard">
        <!-- Widget CDI -->
        <div>
            <h2>Sistema de Detección</h2>
            <cdi-widget 
                api-domain="http://localhost:3001"
                user-id="2"
                user-code="2222"
                language="es">
            </cdi-widget>
        </div>
        
        <!-- Otras secciones -->
        <div>
            <h2>Estadísticas</h2>
            <p>Contenido adicional de tu aplicación</p>
        </div>
    </div>

    <script>
        angular.module('miApp', ['cdiWidget'])
            .controller('MiController', function($scope) {
                console.log('Dashboard inicializado');
            });
    </script>
</body>
</html>
```

### Integración en App Existente

Si ya tienes una aplicación AngularJS:

```javascript
// En tu app.js
angular.module('tuApp', [
    'ngRoute',
    'tuOtroModulo',
    'cdiWidget'  // ← Agregar módulo CDI
]);
```

```html
<!-- En tu template -->
<div class="container">
    <h1>Panel de Control</h1>
    
    <cdi-widget 
        api-domain="{{apiUrl}}"
        user-id="{{userId}}"
        user-code="{{userCode}}"
        language="{{currentLanguage}}">
    </cdi-widget>
</div>
```

---

## 📡 API Requerida

Tu API backend debe implementar estos endpoints:

### 1. Autenticación
```
GET /api/config/usuarios
```

**Respuesta esperada:**
```json
{
    "USR": "base64_encoded_user_array"
}
```

Donde el array decodificado contiene:
```json
[
    {
        "id": 123,
        "code": "abc123",
        "name": "Usuario Demo"
    }
]
```

### 2. Estado del Sistema
```
GET /api/barstatus
```

**Respuesta esperada:**
```json
{
    "barstatus": {
        "ALARMA": false,
        "FALLA": false,
        "DESCONEXION": false,
        "TIERRA": false,
        "TEST": false,
        "EXTINCION": false,
        "BATERIA": 85,
        "ALIMENTACION": true,
        "RED": true
    }
}
```

### 3. Líneas y Entradas
```
GET /api/lines
```

**Respuesta esperada:**
```json
{
    "LINEAS": [
        {
            "number": 1,
            "status": 0,
            "enable": 1,
            "alias": "Sensor Puerta Principal"
        },
        {
            "number": 2,
            "status": 2,
            "enable": 1,
            "alias": "Detector Humo Sala"
        }
    ],
    "ENTRADAS": [
        {
            "number": 1,
            "status": 0,
            "enable": 1,
            "alias": "Entrada Manual"
        }
    ]
}
```

### 4. Configuración General
```
GET /api/config/instalation
```

**Respuesta esperada:**
```json
{
    "cfgGeneral": {
        "NAME": "Edificio Central - EFAISA"
    }
}
```

### 5. Comandos
```
POST /api/cmd
Content-Type: application/json
```

**Cuerpo para ACK:**
```json
{
    "cmdACK": {
        "userId": 123
    }
}
```

**Cuerpo para Reset:**
```json
{
    "cmdReset": {
        "userId": 123
    }
}
```

**Cuerpo para Test:**
```json
{
    "cmdTest": {
        "userId": 123
    }
}
```

### Códigos de Estado

#### Líneas (type: 'line')
- `0` - Normal ✅
- `2` - Alarma 🔴
- `3` - Pre-alarma 🟠
- `4` - Alarma Técnica 🔴
- `6` - Línea abierta 🟡
- `7` - Línea en corto 🟡
- `8` - Excluida 🟡

#### Entradas (type: 'input')
- `0` - Normal ✅
- `1` - Alarma 🔴
- `4` - Alarma Técnica 🔴
- `5` - Falla 🟡
- `8` - Excluida 🟡
- `9` - PDM 🟠
- `12` - Aborto 🔴

### Configuración CORS

Tu API debe permitir peticiones desde el dominio del widget:

```javascript
// Node.js/Express ejemplo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
```

---

## 📁 Estructura del Proyecto

```
cdi-widget/
├── js/
│   ├── cdi-widget.module.js          # Módulo AngularJS y configuraciones
│   ├── cdi-widget.service.js         # Servicio para llamadas API
│   ├── cdi-widget.controller.js      # Lógica principal del widget
│   └── cdi-widget.directive.js       # Directiva <cdi-widget>
│
├── templates/
│   └── cdi-widget.html               # Template HTML del widget
│
├── css/
│   └── cdi-widget.css                # Estilos responsive
│
├── assets/
│   └── icons/                        # Iconos SVG/PNG
│       ├── bell.svg
│       ├── fault.svg
│       ├── disconnect.svg
│       ├── groundconnection.svg
│       ├── test.svg
│       ├── extinction.png
│       ├── battery100.svg
│       ├── battery75.svg
│       ├── battery50.svg
│       ├── battery25.svg
│       ├── batteryfault.svg
│       ├── powersupplynormal.svg
│       ├── powersupplyfault.svg
│       ├── networknormal.svg
│       ├── networkfault.svg
│       ├── check.svg
│       ├── reset.svg
│       ├── line.svg
│       └── input.svg
│
├── index.html                        # AngularJS - Ejemplo directiva (PRODUCCIÓN)
├── test.html                         # Vanilla JS - Demo standalone
└── README.md                         # Esta documentación
```

**Nota:** 
- `index.html` = Versión **AngularJS** modular con directivas, servicios y controladores
- `test.html` = Versión **Vanilla JS** (sin framework), todo en un archivo único

---

## 🎨 Personalización

### Cambiar Colores

Edita `css/cdi-widget.css`:

```css
/* Color primario del header */
.status-bar {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}

/* Color de botones */
.barbutton {
    border-color: #3498db;
}

.barbutton:hover {
    background-color: rgba(52, 152, 219, 0.1);
}

/* Colores de las barras de estado */
.bar.green { background-color: #27ae60; }   /* Normal */
.bar.red { background-color: #e74c3c; }     /* Alarma */
.bar.orange { background-color: #e67e22; }  /* Pre-alarma */
.bar.yellow { background-color: #f39c12; }  /* Falla */
```

### Agregar Nuevo Idioma

En `js/cdi-widget.module.js`, agrega a `CDI_CONFIG.STATUS_LYE`:

```javascript
fr: [
    "Normal", "Alarme", "Alarme", "Pré-alarme", 
    "Alarme technique", "Défaut", "Ligne ouverte", 
    "Court-circuit", "Exclu", "Bouton PDM",
    // ... rest of statuses
]
```

Y en `CDI_CONFIG.DICTIONARY`:

```javascript
statusBar: {
    alarm: { 
        es: "Alarma General", 
        en: "General alarm", 
        pt: "Alarme geral", 
        it: "Allarme generale",
        fr: "Alarme générale"  // ← Nuevo idioma
    },
    // ... rest of translations
}
```

### Cambiar Intervalo de Polling

En `js/cdi-widget.module.js`:

```javascript
.constant('CDI_CONFIG', {
    DEFAULT_LANGUAGE: 'es',
    POLLING_INTERVAL: 2500,  // ← Cambiar aquí (en milisegundos)
    // ...
})
```

### Personalizar Template

Edita `templates/cdi-widget.html` para modificar la estructura HTML:

```html
<!-- Agregar logo personalizado -->
<header ng-if="isConfigured()">
    <nav class="status-bar">
        <div class="icon-container left">
            <img src="assets/mi-logo.png" alt="Logo" class="logo">
            <!-- ... rest of icons -->
        </div>
        <!-- ... -->
    </nav>
</header>
```

---

## 🐛 Troubleshooting & Debug

### Widget no aparece

**Verificar:**
1. AngularJS está cargado ANTES de los scripts del widget
2. Console del navegador (F12) no muestra errores
3. Los paths a los archivos son correctos

```javascript
// En la consola del navegador (F12):
angular.version
// Debe mostrar: Object { full: "1.6.9", ... }

angular.module('cdiWidget')
// Debe mostrar el módulo sin errores
```

### API calls fallan

**Verificar:**
1. CORS está habilitado en tu API
2. Credenciales son correctas (userId, userCode)
3. Network tab (F12) muestra las peticiones

**Debug en consola:**
```javascript
// Ver configuración actual
angular.element(document.querySelector('[ng-controller=CdiWidgetController]'))
    .scope().$ctrl
```

### Botones deshabilitados

- **ACK siempre habilitado** (por defecto)
- **Reset y Test** se habilitan después de autenticación exitosa

Verifica que la autenticación sea exitosa en la consola:
```
User authenticated successfully ✓
```

### Iconos no se muestran

Verifica que la ruta sea correcta:
```
assets/icons/bell.svg
assets/icons/fault.svg
// etc...
```

Comprueba en Network tab (F12) que no hay 404 errors.

### Estilos rotos

1. Limpia caché del navegador (Ctrl+Shift+Del)
2. Verifica que CSS esté cargado: F12 → Network → CSS
3. Comprueba que no haya conflictos con otros CSS

### Datos no se actualizan

Verifica en la consola:
```
Error loading bar data: ...
Error loading lines data: ...
```

Asegúrate que:
- API está online
- Endpoints devuelven JSON válido
- CORS está configurado

### Debug Mode

Para activar logs detallados, abre consola (F12) y ejecuta:

```javascript
// Ver estado actual del widget
angular.element(document.querySelector('[ng-controller=CdiWidgetController]')).scope()

// Ver barStatus
angular.element(document.querySelector('[ng-controller=CdiWidgetController]')).scope().barStatus

// Ver líneas actuales
angular.element(document.querySelector('[ng-controller=CdiWidgetController]')).scope().lines

// Ver entradas actuales
angular.element(document.querySelector('[ng-controller=CdiWidgetController]')).scope().inputs
```

### Testing con datos simulados (Vanilla JS)

Use `test.html` para probar sin API:

1. Abre `test.html` en tu navegador
2. El widget funciona inmediatamente con datos de ejemplo
3. No requiere AngularJS ni servidor backend
4. Perfecto para validar estilos y funcionalidad básica

⚠️ **Importante:** `test.html` es la versión **Vanilla JavaScript** (sin AngularJS). Para testing de la versión AngularJS con tu API real, usa `index.html` con los parámetros URL.

---

## 📱 Responsive Design

El widget es completamente responsive:

- **Desktop (1024px+)**: Diseño completo con 2 columnas
- **Tablet (768px - 1024px)**: Layout adaptado
- **Mobile (320px - 768px)**: Stack vertical, iconos optimizados

```css
/* Personalizar breakpoints en cdi-widget.css */
@media (max-width: 768px) {
    .row {
        flex-direction: column;
    }
    
    .bar-container {
        max-height: 350px;
    }
}
```

---

## 🧪 Ejemplos

### Ejemplo 1: Widget Simple

```html
<cdi-widget 
    api-domain="http://localhost:3001"
    user-id="2"
    user-code="2222"
    language="es">
</cdi-widget>
```

### Ejemplo 2: Múltiples Widgets

```html
<div class="widget-grid">
    <!-- Widget para instalación 1 -->
    <cdi-widget 
        api-domain="http://api1.ejemplo.com"
        user-id="1"
        user-code="code1"
        language="es">
    </cdi-widget>
    
    <!-- Widget para instalación 2 -->
    <cdi-widget 
        api-domain="http://api2.ejemplo.com"
        user-id="2"
        user-code="code2"
        language="en">
    </cdi-widget>
</div>

<style>
    .widget-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
    }
</style>
```

### Ejemplo 3: Integración con ngRoute

```javascript
angular.module('myApp', ['ngRoute', 'cdiWidget'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                template: '<cdi-widget api-domain="{{apiUrl}}" user-id="{{userId}}" user-code="{{code}}" language="es"></cdi-widget>',
                controller: 'DashboardController'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    }])
    .controller('DashboardController', ['$scope', function($scope) {
        $scope.apiUrl = 'http://api.ejemplo.com';
        $scope.userId = 123;
        $scope.code = 'abc123';
    }]);
```

### Ejemplo 4: Con datos dinámicos

```html
<div ng-controller="MiController">
    <select ng-model="selectedSite" ng-change="updateWidget()">
        <option value="site1">Sitio 1</option>
        <option value="site2">Sitio 2</option>
    </select>
    
    <cdi-widget 
        api-domain="{{widgetConfig.apiDomain}}"
        user-id="{{widgetConfig.userId}}"
        user-code="{{widgetConfig.userCode}}"
        language="{{widgetConfig.language}}">
    </cdi-widget>
</div>

<script>
angular.module('myApp', ['cdiWidget'])
    .controller('MiController', ['$scope', function($scope) {
        $scope.sites = {
            site1: {
                apiDomain: 'http://api1.com',
                userId: 1,
                userCode: 'code1',
                language: 'es'
            },
            site2: {
                apiDomain: 'http://api2.com',
                userId: 2,
                userCode: 'code2',
                language: 'en'
            }
        };
        
        $scope.selectedSite = 'site1';
        $scope.widgetConfig = $scope.sites[$scope.selectedSite];
        
        $scope.updateWidget = function() {
            $scope.widgetConfig = $scope.sites[$scope.selectedSite];
        };
    }]);
</script>
```

---

## 🔧 Características Avanzadas

### Prevención de Flickering

El widget incluye optimizaciones para prevenir parpadeo durante las actualizaciones:

- **Change detection** en barStatus (iconos de estado)
- **Array comparison** en líneas y entradas
- Solo re-renderiza cuando hay cambios reales en los datos

### Polling Inteligente

- Intervalo configurable (default: 2.5s)
- Se detiene automáticamente cuando el componente se destruye
- No hace polling si hay un modal abierto (loader)

### Gestión de Estado

- **Caché de iconos** para prevenir infinite digest loops
- **Estado previo** guardado para comparación eficiente
- **Ordenamiento personalizado** de líneas e entradas por prioridad

---

## 📝 Notas Técnicas

### Versiones del Widget

Este proyecto proporciona **dos implementaciones**:

1. **AngularJS (`index.html`)** ✅ RECOMENDADA
   - Arquitectura modular (MVC)
   - Directiva reutilizable `<cdi-widget>`
   - Para integración en aplicaciones
   - Requiere: AngularJS 1.6.9+

2. **Vanilla JS (`test.html`)** 🧪 SOLO TESTING
   - Sin dependencias de frameworks
   - Archivo único standalone
   - Para demos y pruebas locales
   - No requiere instalación

### Compatibilidad

- **AngularJS**: 1.6.9+
- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Mobile**: iOS 12+, Android 7+

### Performance

- Optimizado para evitar re-renders innecesarios
- Lazy loading de datos
- Mínimo uso de watchers

### Seguridad

- Autenticación requerida antes de mostrar datos
- Tokens de usuario enviados en cada petición
- CORS debe estar configurado correctamente

---

## 📄 Licencia

Propiedad de EFAISA - Sistemas de Seguridad

---

## 📞 Soporte

Para reportar problemas o sugerencias:

1. Abre la consola del navegador (F12)
2. Busca mensajes de error en rojo
3. Verifica Network tab para problemas de API
4. Revisa esta documentación

---

**Versión:** 1.0  
**Última actualización:** Febrero 2026  
**Autor:** EFAISA Development Team
