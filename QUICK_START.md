# CDI Widget - AngularJS Integration - Quick Start

## 🚀 3 Maneras de Usar el Widget

### ✅ **Opción 1: Como Directiva (RECOMENDADO) - NUEVO**

```html
<!-- En tu HTML -->
<cdi-widget 
    api-domain="http://api.ejemplo.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

**Setup mínimo:**
```html
<!-- En tu página -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<script src="cdi-widget/js/cdi-widget.module.js"></script>
<script src="cdi-widget/js/cdi-widget.service.js"></script>
<script src="cdi-widget/js/cdi-widget.controller.js"></script>
<script src="cdi-widget/js/cdi-widget.directive.js"></script>

<link rel="stylesheet" href="cdi-widget/css/cdi-widget.css">
```

**En tu app AngularJS:**
```javascript
angular.module('miApp', ['cdiWidget']);
```

**Ver ejemplo completo:** [example-directive.html](example-directive.html)

---

### ✅ **Opción 2: Widget Standalone (Sin API)**

Abre este archivo para ver el widget con datos de prueba:

```
test.html
```

Esto funciona en local (file://) sin necesidad de servidor.

---

### ✅ **Opción 3: URL Parameters**

```
index-angular.html?apiDomain=http://tu-api.com&userId=123&code=abc123
```

## 🚀 Uso rápido

### Opción 1: Standalone (más fácil)
```bash
# Abre este archivo en el navegador
index-angular.html?apiDomain=http://tu-api.com&userId=123&code=abc123
```

### Opción 2: Dentro de tu app AngularJS

```html
<!-- En tu app principal -->
<script src="js/cdi-widget.module.js"></script>
<script src="js/cdi-widget.service.js"></script>
<script src="js/cdi-widget.controller.js"></script>
<link rel="stylesheet" href="css/cdi-widget.css">

<!-- En tu módulo -->
angular.module('tuApp', ['cdiWidget']);

<!-- En tu HTML -->
<div ng-controller="CdiWidgetController">
    <ng-include src="'templates/cdi-widget.html'"></ng-include>
</div>
```

### Opción 3: Ver ejemplo completo
```bash
# Abre este archivo para ver cómo integrar con un dashboard
example-app.html
```

## ✨ Características principales

✅ Autenticación de usuarios  
✅ Polling automático (2.5s)  
✅ Mostrar líneas y entradas  
✅ Control de botones (ACK, Reset, Test)  
✅ Indicadores de estado (batería, poder, red)  
✅ Soporte 4 idiomas (ES, EN, PT, IT)  
✅ 100% Responsive  
✅ Modales y loaders  

## 🔧 Parámetros configurables

Via URL:
```
?apiDomain=http://api.ejemplo.com
&userId=123
&code=abc123
&language=es
```

## 📋 API Endpoints esperados

```
GET  /api/config/usuarios           # Autenticación
GET  /api/barstatus                 # Estado actual
GET  /api/lines                     # Líneas
GET  /api/config/instalation        # Info instalación

POST /api/cmd                       # Comandos
```

## 🎨 Personalización

### Cambiar colores primarios
Edita `css/cdi-widget.css` y busca:
```css
.status-bar { background: linear-gradient(135deg, #1e3c72, #2a5298); }
.barbutton { border-color: #3498db; }
```

### Agregar nuevos idiomas
En `js/cdi-widget.module.js` agrega a `CDI_CONFIG.STATUSES`

### Cambiar intervalo de polling
En `js/cdi-widget.controller.js`:
```javascript
CDI_CONFIG.DEFAULT_POLLING_INTERVAL || 2500  // cambiar 2500
```

## 📚 Documentación completa

Revisa [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) para guía detallada

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Widget no carga | Verifica AngularJS esté cargado primero |
| API calls fallan | Revisa console browser y CORS headers |
| Estilos rotos | Limpia cache (Ctrl+Shift+Del) |
| Botones deshabilitados | Verifica autenticación está correcta |

## 📞 Próximos pasos

1. Ajusta endpoints API en tu servidor
2. Prueba con `index-angular.html` primero
3. Integra en tu app usando `example-app.html` como referencia
4. Personalizaiza estilos según tu marca

---

**¡Listo para usar! El widget es completamente funcional y reutilizable.**
