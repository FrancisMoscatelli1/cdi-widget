# CDI Widget - Directiva AngularJS

Utiliza el widget CDI como una directiva personalizada de AngularJS.

## 🎯 Uso Básico

```html
<cdi-widget 
    api-domain="http://api.ejemplo.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

## 📦 Instalación

### 1. Incluir scripts en tu HTML

```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

<!-- CDI Widget archivos -->
<script src="cdi-widget/js/cdi-widget.module.js"></script>
<script src="cdi-widget/js/cdi-widget.service.js"></script>
<script src="cdi-widget/js/cdi-widget.controller.js"></script>
<script src="cdi-widget/js/cdi-widget.directive.js"></script>

<!-- CDI Widget estilos -->
<link rel="stylesheet" href="cdi-widget/css/cdi-widget.css">
```

### 2. Agregar módulo a tu app

```javascript
angular.module('miApp', ['cdiWidget']);
```

### 3. Usar la directiva

```html
<div ng-app="miApp">
    <cdi-widget 
        api-domain="http://mi-api.com"
        user-id="123"
        user-code="micodigo"
        language="es">
    </cdi-widget>
</div>
```

## 🔧 Atributos

| Atributo      | Tipo    | Requerido | Descripción |
|---------------|---------|-----------|-------------|
| `api-domain`  | string  | ✅ Sí    | URL base de tu API |
| `user-id`     | number  | ✅ Sí    | ID del usuario |
| `user-code`   | string  | ✅ Sí    | Código de autenticación |
| `language`    | string  | ❌ No    | es, en, pt, it (default: es) |

## 📡 API Endpoints Requeridos

Tu API debe implementar estos endpoints:

```
GET  /api/config/usuarios           # Autenticación
GET  /api/barstatus                 # Estado actual
GET  /api/lines                     # Datos de líneas
GET  /api/config/instalation        # Información de instalación

POST /api/cmd                       # Enviar comandos
  - {cmdACK: {userId}}
  - {cmdReset: {userId}}
  - {cmdTest: {userId}}
```

## 📋 Respuesta esperada de `/api/barstatus`

```javascript
{
    "barStatus": {
        "battery": 85,
        "powerSupply": true,
        "network": true,
        "hasAlarm": false
    },
    "lines": [
        {
            "number": 1,
            "status": 0,
            "enable": 1,
            "alias": "Sensor Puerta"
        },
        {
            "number": 2,
            "status": 2,
            "enable": 1,
            "alias": "Sensor Ventana"
        }
    ],
    "inputs": [
        {
            "number": 1,
            "status": 0,
            "enable": 1,
            "alias": "Entrada 1"
        }
    ]
}
```

## 🎨 Personalización

### Cambiar estilos globales

Edita `css/cdi-widget.css`:

```css
/* Color primario de botones */
.barbutton {
    border-color: #tu-color;
}

/* Color del header */
.status-bar {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Cambiar idioma disponible

En `js/cdi-widget.module.js`, modifica `CDI_CONFIG.STATUSES`.

## 🔄 Valores de Status

Los estados se muestran según estos códigos:

### Líneas
- 0: Normal ✓
- 1,2: Alarma 🔴
- 3: Pre alarma 🟡
- 4: Alarma técnica 🟠
- 5,6,7: Falla 🔴
- 8: Excluida ✓
- 9: PDM 🟠

### Entradas
- 0: Normal ✓
- 1: Alarma 🔴
- 4: Pre alarma 🟡
- 5, 9, 12: Estado especial 🟠

## 💡 Ejemplo Completo

```html
<!DOCTYPE html>
<html ng-app="miApp">
<head>
    <meta charset="UTF-8">
    <title>Mi Aplicación con CDI Widget</title>
    
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="cdi-widget/js/cdi-widget.module.js"></script>
    <script src="cdi-widget/js/cdi-widget.service.js"></script>
    <script src="cdi-widget/js/cdi-widget.controller.js"></script>
    <script src="cdi-widget/js/cdi-widget.directive.js"></script>
    
    <link rel="stylesheet" href="cdi-widget/css/cdi-widget.css">
</head>
<body ng-controller="MiController">
    <div style="display: flex; gap: 20px; padding: 20px;">
        <!-- Widget -->
        <div style="flex: 1;">
            <cdi-widget 
                api-domain="http://localhost:3001"
                user-id="2"
                user-code="2222"
                language="es">
            </cdi-widget>
        </div>
        
        <!-- Otras componentes de tu app -->
        <div style="flex: 1;">
            <h2>Mi contenido</h2>
            <p>El widget está a la izquierda</p>
        </div>
    </div>

    <script>
        angular.module('miApp', ['cdiWidget'])
            .controller('MiController', function($scope) {
                // Tu lógica aquí
            });
    </script>
</body>
</html>
```

## 🧪 Testing

### Ver ejemplo con datos simulados

```
example-directive.html
```

Abre este archivo para ver el widget funcionando sin API real.

## 🐛 Solución de Problemas

### Widget no se muestra
- ✓ Verifica que AngularJS está cargado ANTES de los scripts del widget
- ✓ Comprueba que el módulo está incluido: `angular.module('miApp', ['cdiWidget'])`
- ✓ Abre Console (F12) para ver errores

### API calls fallan
- ✓ Verifica que los endpoints están correctos
- ✓ Habilita CORS en tu API
- ✓ Comprueba credenciales (userId, userCode)

### Estilos no aplican
- ✓ Limpia caché (Ctrl+Shift+Del)
- ✓ Verifica ruta del CSS
- ✓ Revisa que no haya conflictos con otros CSS

## 📚 Ver más

- [QUICK_START.md](QUICK_START.md) - Guía rápida
- [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) - Documentación completa
- [DEBUG.md](DEBUG.md) - Guía de debug

## 📞 Soporte

Para reportar problemas o sugerencias, abre la consola del navegador (F12) y busca mensajes de error.
