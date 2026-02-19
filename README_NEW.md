# CDI Widget - Refactorizado a AngularJS

Widget de monitoreo y control para sistemas CDI de EFAISA. Aplicación web AngularJS que permite visualizar el estado de líneas y entradas, así como ejecutar comandos de control del sistema.

## ✨ Características

- ✅ Monitoreo en tiempo real de líneas de detección
- ✅ Visualización del estado de entradas del sistema
- ✅ Panel de control con comandos ACK, Reset y Test
- ✅ Interfaz multiidioma (ES/EN/PT)
- ✅ Autenticación de usuarios
- ✅ Actualizaciones automáticas (polling 2.5s)
- ✅ Indicadores de estado (batería, alimentación, red)
- ✅ 100% Responsive
- ✅ Modales y loaders

## 🚀 3 Formas de Usar el Widget

### 1️⃣ Como Directiva AngularJS (RECOMENDADO)

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
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
<script src="cdi-widget/js/cdi-widget.module.js"></script>
<script src="cdi-widget/js/cdi-widget.service.js"></script>
<script src="cdi-widget/js/cdi-widget.controller.js"></script>
<script src="cdi-widget/js/cdi-widget.directive.js"></script>
<link rel="stylesheet" href="cdi-widget/css/cdi-widget.css">

<script>
    angular.module('myApp', ['cdiWidget']);
</script>
```

**Ver ejemplo:** [example-directive.html](example-directive.html)

---

### 2️⃣ Standalone (Sin API - Para pruebas)

```
test.html
```

Abre este archivo en el navegador para ver el widget con datos simulados.

---

### 3️⃣ URL Parameters

```
index-angular.html?apiDomain=http://api.com&userId=123&code=abc123&language=es
```

## 📁 Estructura

```
cdi-widget/
├── js/
│   ├── cdi-widget.module.js      ← Módulo principal
│   ├── cdi-widget.service.js     ← Llamadas API
│   ├── cdi-widget.controller.js  ← Lógica del widget
│   └── cdi-widget.directive.js   ← Directiva <cdi-widget>
├── templates/
│   └── cdi-widget.html           ← Template HTML
├── css/
│   └── cdi-widget.css            ← Estilos (responsive)
├── assets/icons/                 ← Iconos SVG
├── test.html                     ← Demo con datos simulados
├── example-directive.html        ← Ejemplo de la directiva
├── example-app.html              ← App con dashboard
├── QUICK_START.md                ← Guía rápida
├── DIRECTIVE.md                  ← Guía de directiva
├── INTEGRATION_GUIDE.md          ← Documentación completa
└── DEBUG.md                      ← Guía de debug
```

## 📦 Instalación Rápida

### 1. Copiar archivos a tu proyecto

```
tu-proyecto/
└── widgets/
    └── cdi-widget/
        ├── js/
        ├── templates/
        ├── css/
        └── assets/
```

### 2. Incluir en tu HTML

```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<!-- CDI Widget -->
<script src="widgets/cdi-widget/js/cdi-widget.module.js"></script>
<script src="widgets/cdi-widget/js/cdi-widget.service.js"></script>
<script src="widgets/cdi-widget/js/cdi-widget.controller.js"></script>
<script src="widgets/cdi-widget/js/cdi-widget.directive.js"></script>
<link rel="stylesheet" href="widgets/cdi-widget/css/cdi-widget.css">
```

### 3. Usar en tu app

```javascript
angular.module('myApp', ['cdiWidget']);
```

### 4. Agregar a tu HTML

```html
<cdi-widget 
    api-domain="http://tu-api.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

## 📡 API Requerida

Tu API debe tener estos endpoints:

```
GET  /api/config/usuarios      # Autenticación
GET  /api/barstatus            # Estado actual
GET  /api/lines                # Datos de líneas
GET  /api/config/instalation   # Información instalación

POST /api/cmd                  # Comandos
```

## 🎨 Personalización

### Cambiar estilos

Edita `css/cdi-widget.css`.

### Agregar idiomas

En `js/cdi-widget.module.js`, modifica `CDI_CONFIG.STATUSES`.

## 🧪 Prueba Rápida

1. Abre **test.html** en tu navegador
2. Haz clic en **"Cargar datos de prueba"**
3. Verás el widget funcionando con datos simulados

## 📖 Documentación

- [QUICK_START.md](QUICK_START.md) - Guía rápida (5 min)
- [DIRECTIVE.md](DIRECTIVE.md) - Uso como directiva
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Guía completa
- [DEBUG.md](DEBUG.md) - Solución de problemas

## 🔗 URLs de Prueba

```
test.html
example-directive.html
example-app.html
index-angular.html?apiDomain=http://localhost:3001&userId=2&code=2222
```

## 📲 Responsive

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

## 🐛 Troubleshooting

**Widget no aparece:**
- Verifica que AngularJS esté cargado ANTES del widget
- Abre F12 Console y busca errores

**API calls fallan:**
- Verifica CORS en tu API
- Comprueba credenciales (userId, userCode)
- Revisa Network tab (F12)

## 📝 Versión

- **v2.0** - Refactor a AngularJS
- **v1.0** - Widget standalone original

## 🏢 Autor

EFAISA - Sistemas de Seguridad

## 📄 Licencia

Propiedad de EFAISA
