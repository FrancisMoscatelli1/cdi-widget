# CDI2 Widget - EFAISA

Widget de monitoreo y control para sistemas CDI2 de EFAISA. Aplicación web que permite visualizar el estado de líneas y entradas, así como ejecutar comandos de control del sistema.

## Características

- 🔥 Monitoreo en tiempo real de líneas de detección
- 📊 Visualización del estado de entradas del sistema
- 🎛️ Panel de control con comandos ACK, Reset y Test
- 🌐 Interfaz multiidioma (Español/Inglés)
- 🔐 Sistema de autenticación por URL
- ⚙️ Configuración flexible de API mediante parámetros


## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/FrancisMoscatelli1/cdi2-widget.git
cd cdi2-widget
```

2. Abri archivo `index.html` en tu navegador para ver el widget en acción.:


## Configuración

### API Domain

La aplicación se puede configurar para conectarse a diferentes APIs mediante parámetros de URL:

```
https://tu-dominio.com/?apiDomain=http://192.168.1.100:3001
```

**Ejemplo de URLs:**
- Desarrollo local: `http://localhost:5173/?apiDomain=http://localhost:3001`
- Producción: `https://widget.efaisa.com/?apiDomain=https://api.efaisa.com`

### Autenticación

El sistema utiliza autenticación basada en parámetros de URL:

```
https://tu-dominio.com/?apiDomain=http://api.com&userId=123&code=abc123
```

**Parámetros de autenticación:**
- `userId`: ID del usuario en el sistema
- `code`: Código de acceso del usuario

## Uso

### Panel Principal

La interfaz principal muestra:

1. **Barra de navegación**: Información del sistema y selector de idioma
2. **Panel de líneas**: Estado de las líneas de detección con iconos de estado
3. **Panel de entradas**: Estado de las entradas del sistema
4. **Panel de control**: Botones para ejecutar comandos

### Estados de Líneas

Las líneas se muestran con diferentes estados visuales:
- 🟢 **Normal** (Estado 2)
- 🟡 **Alarma** (Estado 3)
- 🔴 **Fallo** (Estado 4)
- ⚫ **Desconectado** (Estado 6)
- 🔵 **Test** (Estado 7)
- 🟠 **Inhibido** (Estado 8)
- ⚪ **Sin configurar** (Estado 0)

### Estados de Entradas

Las entradas se organizan por prioridad:
- 🔴 **Fallo alimentación** (Estado 12)
- 🟡 **Fallo general** (Estado 9)
- 🟢 **Test** (Estado 1)
- 🔵 **Reset** (Estado 4)
- 🟠 **ACK** (Estado 5)
- ⚪ **Normal** (Estado 0)

### Comandos Disponibles

- **ACK (Acknowledge)**: Reconoce alarmas activas
- **Reset**: Reinicia el sistema
- **Test**: Ejecuta rutina de prueba

## Scripts Disponibles

- `npm run dev`: Ejecuta la aplicación en modo desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm run lint`: Ejecuta el linter de código
- `npm run preview`: Previsualiza la build de producción

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── BarButton.jsx   # Botón de comando
│   ├── LineBar.jsx     # Barra de estado de línea/entrada
│   ├── NavBar.jsx      # Barra de navegación
│   └── modals/         # Componentes de modales
├── contexts/           # Contextos de React
├── config/            # Configuración de la aplicación
├── utils/             # Utilidades y helpers
├── assets/            # Recursos estáticos (iconos, imágenes)
└── dictionary.js      # Traducciones multiidioma
```

## API Endpoints

La aplicación consume los siguientes endpoints:

- `GET /api/linesstatus`: Obtiene el estado de líneas y entradas
- `GET /api/config/general`: Configuración general del sistema
- `GET /api/config/usuarios`: Información de usuarios
- `POST /api/cmd`: Envía comandos al sistema
  - `{ cmdACK: {} }`: Comando acknowledge
  - `{ cmdReset: {} }`: Comando reset
  - `{ cmdTest: {} }`: Comando test

## Despliegue

1. Compila la aplicación:
```bash
npm run build
```

2. Los archivos compilados estarán en la carpeta `dist/`

3. Despliega los archivos en tu servidor web

4. Configura la URL con los parámetros necesarios:
```
https://tu-servidor.com/?apiDomain=https://api.efaisa.com&userId=123&code=123
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia

Este proyecto es propiedad de EFAISA. Todos los derechos reservados.

## Contacto

Para soporte técnico o consultas, contacta al equipo de desarrollo de EFAISA.
