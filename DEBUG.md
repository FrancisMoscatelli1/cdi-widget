# 🔧 Guía de Debug - Widget CDI AngularJS

## 🎯 Recapitulativo rápido

El widget está en `cdi-widget/` con esta estructura:

```
js/
  ├── cdi-widget.module.js      ← Módulo y configuración
  ├── cdi-widget.service.js     ← Llamadas API
  └── cdi-widget.controller.js  ← Lógica principal

templates/
  └── cdi-widget.html           ← UI del widget

css/
  └── cdi-widget.css            ← Estilos

assets/icons/                   ← Iconos SVG
```

## ✅ Verificar que todo esté bien

### 1️⃣ **Abrir archivo de TEST**

El archivo `test.html` te permite probar sin API:

```
Abre: file:///c:/Users/fmosc/Documentos/Clients/EFAISA/CODE/cdi-widget/test.html
```

✅ **Aquí deberías ver:**
- Un panel izquierdo con configuración
- Un botón "Cargar datos de prueba"
- El widget en el lado derecho

### 2️⃣ **Cargar datos de prueba**

Haz clic en "📊 Cargar datos de prueba" para:
- Simular datos de API sin necesidad de servidor real
- Ver cómo el widget muestra líneas, entradas, botones
- Debug log mostrando qué sucede

### 3️⃣ **Verificar la consola del navegador**

Abre DevTools: **F12** → pestaña **Console**

Deberías ver mensajes como:
```
✓ CDI Widget App initialized successfully
✓ DOM loaded - CDI Widget should be visible
✓ Test App iniciada
✓ Configuración aplicada
```

Si ves **errores rojos**, eso es lo que necesitas arreglar.

## 🚀 Uso normal (con API real)

Cuando tengas una API configurada, usa:

```
index-angular.html?apiDomain=http://tu-api.com&userId=123&code=abc123&language=es
```

**Parámetros:**
- `apiDomain`: URL de tu API (sin barra final)
- `userId`: ID del usuario (número)
- `code`: Código de autenticación
- `language`: es, en, pt

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| **"Widget no configurado"** | Necesitas parámetros URL o datos en localStorage |
| **Botones deshabilitados** | No está autenticado - verifica credenciales |
| **Iconos no se ven** | Abre console (F12) - busca errores 404 |
| **Datos no se actualizan** | Revisa que la API esté online y CORS habilitado |
| **Template no renderiza** | Verifica ruta: `templates/cdi-widget.html` |

## 📋 Checklist

- [ ] Abrir `test.html` - ver interfaz
- [ ] Haz clic "Cargar datos de prueba"
- [ ] Ver debug log en consola (F12)
- [ ] Verificar que Widget aparece
- [ ] Si todo OK → usar con API real
- [ ] Si hay errores → postear error del console

## 🔍 Ver qué está pasando

### En el archivo test.html:
1. **Panel izquierdo** = Configuración y Debug
2. **Panel derecho** = El widget
3. **Debug Log** = Mensajes útiles

### En la consola del navegador (F12):
```javascript
// Ver si AngularJS está cargado
angular.version
// Output: Object { full: "1.6.9", ... }

// Ver si módulo existe
angular.module('cdiWidget')
// Output: Module { ... }

// Ver configuración
angular.injector(['cdiWidget']).get('CDI_CONFIG')
```

## 📞 Próximos pasos

1. ✅ Prueba con `test.html` primero
2. ✅ Verifica consola browser (F12)
3. ✅ Si todo OK, adapta tu API
4. ✅ Integra en tu app con los endpoints correctos

---

**¡Cualquier error que veas en consola (F12), eso es lo que necesito for fijar!**
