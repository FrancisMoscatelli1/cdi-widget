# CDI Widget - AngularJS Integration

Este widget de CDI ha sido refactorizado para integrarse como un componente reutilizable en aplicaciones AngularJS.

## Estructura de carpetas

```
cdi-widget/
├── js/
│   ├── cdi-widget.module.js          # Definición del módulo
│   ├── cdi-widget.service.js         # Servicio de API
│   └── cdi-widget.controller.js      # Controlador principal
├── templates/
│   └── cdi-widget.html               # Template del widget
├── css/
│   └── cdi-widget.css                # Estilos del widget
├── assets/
│   └── icons/                        # Iconos SVG
├── index.html                        # Original (standalone)
├── index-angular.html                # Versión AngularJS
└── readme.md
```

## Installation

1. **Copiar archivos** a tu proyecto AngularJS:
   ```
   proyecto-angular/
   └── widgets/
       └── cdi-widget/
           ├── js/
           ├── templates/
           ├── css/
           └── assets/
   ```

2. **Incluir en tu HTML principal:**
   ```html
   <!-- AngularJS -->
   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
   
   <!-- CDI Widget -->
   <script src="widgets/cdi-widget/js/cdi-widget.module.js"></script>
   <script src="widgets/cdi-widget/js/cdi-widget.service.js"></script>
   <script src="widgets/cdi-widget/js/cdi-widget.controller.js"></script>
   <link rel="stylesheet" href="widgets/cdi-widget/css/cdi-widget.css">
   ```

3. **Agregar módulo a tu app:**
   ```javascript
   angular.module('miApp', ['cdiWidget']);
   ```

## Uso

### Opción 1: URL Parameters (Standalone)

```html
<!-- Cargar archivo -->
<script src="index-angular.html"></script>

<!-- O acceder con parámetros URL -->
http://localhost:8000/cdi-widget/index-angular.html?
  apiDomain=http://api.ejemplo.com&
  userId=123&
  code=abc123&
  language=es
```

### Opción 2: Dentro de una app AngularJS

```html
<div ng-app="miApp" ng-controller="MiController">
    <!-- Widget sin pasar parámetros (obtiene de URL) -->
    <ng-include src="'widgets/cdi-widget/templates/cdi-widget.html'"></ng-include>
    
    <!-- O con controlador específico -->
    <div ng-controller="CdiWidgetController">
        <ng-include src="'widgets/cdi-widget/templates/cdi-widget.html'"></ng-include>
    </div>
</div>
```

### Opción 3: Como Directiva (Avanzado)

Si necesitas encapsular como directiva:

```javascript
angular.module('cdiWidget')
    .directive('cdiWidget', function() {
        return {
            restrict: 'E',
            templateUrl: 'widgets/cdi-widget/templates/cdi-widget.html',
            controller: 'CdiWidgetController',
            scope: {
                apiDomain: '@',
                userId: '@',
                userCode: '@',
                language: '@'
            }
        };
    });
```

Uso:
```html
<cdi-widget 
    api-domain="http://api.ejemplo.com"
    user-id="123"
    user-code="abc123"
    language="es">
</cdi-widget>
```

## Parámetros configurables

### Via URL
```
?apiDomain=http://api.ejemplo.com
&userId=123
&code=abc123
&language=es
```

### Options
- **apiDomain**: URL del API (requerido)
- **userId**: ID del usuario (requerido)
- **code**: Código de autenticación (requerido)
- **language**: Idioma (es, en, pt, it) - Default: es

## Funcionalidades

- ✅ Autenticación de usuarios
- ✅ Polling automático de estado (2.5s)
- ✅ Mostrar líneas y entradas del sistema
- ✅ Indicadores de estado (batería, alimentación, red)
- ✅ Botones de control (ACK, Reset, Test)
- ✅ Modales de alerta y loader
- ✅ Soporte multi-idioma
- ✅ Estilos responsive
- ✅ Actualización en tiempo real

## API Endpoints esperados

Tu API debe implementar estos endpoints:

```
GET  /api/config/usuarios              # Autenticación
GET  /api/barstatus                    # Estado actual
GET  /api/lines                        # Info de líneas
GET  /api/config/instalation           # Nombre de instalación

POST /api/cmd                          # Enviar comandos
  - {cmdACK: {userId}}
  - {cmdReset: {userId}}
  - {cmdTest: {userId}}
```

## Ejemplo de respuesta API

```javascript
// GET /api/barstatus
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

## Personalización

### Cambiar estilos

Edita `css/cdi-widget.css` con tus colores y fuentes:

```css
/* Cambiar color primario */
.barbutton {
    border-color: #tu-color;
}

/* Cambiar header */
.status-bar {
    background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Agregar nuevos idiomas

En `js/cdi-widget.module.js`:

```javascript
it: [
    "Normale", "Allarme", "Allarme", "Pre-allarme", 
    // ... rest of statuses
]
```

### Extender funcionalidad

El controlador está diseñado para ser extensible. Puedes agregar métodos y watchers:

```javascript
// En tu controlador padre
$scope.$watch('barStatus', function(newVal) {
    // Reaccionar a cambios de estado
}, true);
```

## Troubleshooting

### Widget no carga
- Verifica que AngularJS está cargado antes
- Comprueba console browser para errores
- Valida que paths a templates sean correctos

### API calls fallan
- Verifica CORS headers en tu API
- Comprueba credenciales (apiDomain, userId, code)
- Revisa Network tab en DevTools

### Estilos no aplican
- Limpia cache del browser (Ctrl+Shift+Del)
- Verifica ruta del CSS
- Abre DevTools > Elements para validar

## Version History

- **v1.0** - Refactor a AngularJS
- **v0.1** - Widget standalone original

## License

Propiedad de EFAISA

## Support

Para soporte, contacta al equipo de desarrollo.
