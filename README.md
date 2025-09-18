# 📱 Galería Cyber - App Híbrida Ionic/Angular

<p align="center">
  <img src="https://img.shields.io/badge/Ionic-8.0.0-blue?style=for-the-badge&logo=ionic" alt="Ionic">
  <img src="https://img.shields.io/badge/Angular-20.0.0-red?style=for-the-badge&logo=angular" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5.8.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Capacitor-7.4.3-black?style=for-the-badge&logo=capacitor" alt="Capacitor">
</p>

## 📖 Descripción

**Galería Cyber** es una aplicación híbrida moderna desarrollada con Ionic 8 y Angular 20 que permite a los usuarios capturar, almacenar y gestionar fotografías con un diseño futurista cyberpunk. La aplicación incluye un sistema de autenticación completo con JWT simulado, almacenamiento separado por usuario y una interfaz visual impactante con efectos neón y animaciones holográficas.

### 🎯 Características Principales

- **🔐 Sistema de autenticación completo** con login/registro y manejo de sesiones JWT
- **📸 Captura de fotos** usando la cámara del dispositivo con alta calidad
- **👤 Galerías privadas** - cada usuario tiene su propia colección aislada de fotos
- **🗑️ Eliminación inteligente** con confirmación y feedback visual
- **🛡️ Manejo robusto de errores** con validaciones y recuperación automática
- **👨‍👩‍👧‍👦 Multi-usuario** - soporte completo para múltiples cuentas
- **🎨 Diseño cyberpunk** con efectos neón, holográficos y animaciones
- **📱 Responsive design** optimizado para móviles, tablets y escritorio
- **🔄 Persistencia de datos** con Ionic Storage y sistema de archivos
- **🚀 Multiplataforma** - web, iOS y Android con Capacitor
- **🔒 Protección de rutas** - navegación segura según estado de autenticación

## ⚡ Ejecución Rápida

```bash
# Clonar e instalar
git clone <repo-url>
cd miAppTienda
npm install

# Ejecutar en navegador
ionic serve
```

### Credenciales Demo

| Usuario | Email | Contraseña | Descripción |
|---------|-------|------------|-------------|
| `admin` | admin@cyber.com | `admin123` | Administrador del sistema |
| `demo`  | demo@cyber.com | `demo123`  | Usuario demostración |
| `test`  | test@cyber.com | `test123`  | Usuario de pruebas |

> **Nota**: Puedes crear nuevos usuarios usando el formulario de registro

## 🏢️ Arquitectura Técnica

### Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------||
| **Ionic Framework** | 8.0.0 | Framework de UI híbrida |
| **Angular** | 20.0.0 | Framework de desarrollo frontend |
| **TypeScript** | 5.8.0 | Lenguaje de programación tipado |
| **Capacitor** | 7.4.3 | Runtime nativo multiplataforma |
| **SCSS** | - | Preprocesador CSS para estilos |
| **RxJS** | 7.8.0 | Programación reactiva |

### Plugins de Capacitor

- **@capacitor/camera** - Acceso a la cámara del dispositivo
- **@capacitor/filesystem** - Gestión de archivos locales
- **@capacitor/preferences** - Almacenamiento de preferencias
- **@ionic/storage-angular** - Base de datos local

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── models/                     # Interfaces y tipos de datos
│   │   ├── auth.interface.ts       # Tipos para autenticación
│   │   └── photo.interface.ts      # Tipos para fotos
│   ├── services/                   # Servicios de la aplicación
│   │   ├── auth.service.ts         # Gestión de autenticación
│   │   └── photo.service.ts        # Gestión de fotos
│   ├── pages/                      # Páginas de la aplicación
│   │   ├── auth/
│   │   │   ├── login/              # Página de inicio de sesión
│   │   │   └── register/           # Página de registro
│   │   └── gallery/                # Galería principal de fotos
│   ├── app-routing.module.ts       # Configuración de rutas
│   ├── app.component.ts            # Componente raíz
│   └── app.module.ts               # Módulo principal
├── global.scss                     # Estilos globales cyberpunk
├── theme/
│   └── variables.scss              # Variables de tema
└── index.html                      # Archivo HTML principal
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Ionic CLI** (`npm install -g @ionic/cli`)
- **Angular CLI** (`npm install -g @angular/cli`)

### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd miAppTienda
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   ionic serve
   ```

4. **Acceder a la aplicación**
   - Abrir navegador en `http://localhost:8100`

## 🛠️ Instalación Local

### Prerrequisitos
```bash
# Verificar versiones
node --version    # v18+
npm --version     # v9+
```

### Instalación Rápida
```bash
# 1. Clonar proyecto
git clone https://github.com/migueltorresd/Gallery.git
cd Gallery

# 2. Instalar dependencias
npm install

# 3. Instalar Ionic CLI (si no lo tienes)
npm install -g @ionic/cli

# 4. Ejecutar en navegador
ionic serve
```

### Para Móviles

**Android:**
```bash
# Agregar plataforma
ionic cap add android

# Sincronizar código
ionic cap sync android

# Abrir Android Studio
ionic cap open android
```

**iOS (solo macOS):**
```bash
# Agregar plataforma
ionic cap add ios

# Sincronizar código
ionic cap sync ios

# Abrir Xcode
ionic cap open ios
```

## 🎨 Sistema de Diseño

### Paleta de Colores Cyberpunk

```scss
:root {
  --cyber-neon-green: #39ff14;   // Verde neón principal
  --cyber-neon-blue: #00ffff;    // Azul cian brillante
  --cyber-neon-pink: #ff00ff;    // Rosa/magenta neón
  --cyber-neon-purple: #9d00ff;  // Púrpura eléctrico
  --background-dark: #0a0a0f;    // Fondo oscuro principal
}
```

### Efectos Visuales

- **Glow Effects**: Sombras neón en textos e iconos
- **Holographic Backgrounds**: Gradientes animados multi-color
- **Grid Pattern**: Patrones de cuadrícula futuristas
- **Animated Transitions**: Transiciones suaves entre estados

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

1. **Registro** → Nuevo usuario crea cuenta con email y contraseña
2. **Login** → Usuario ingresa credenciales existentes
3. **JWT Generation** → Sistema genera token simulado con datos del usuario
4. **Storage** → Token y datos se almacenan localmente de forma segura
5. **State Management** → Estado reactivo con RxJS Observable
6. **Route Protection** → Redirección automática según estado de autenticación
7. **Session Persistence** → Mantiene sesión entre reinicios de la app

### Características de Seguridad

- **JWT Tokens**: Simulación realista de tokens JWT con payload completo
- **Session Management**: Gestión automática de sesiones con estado reactivo
- **Auto-logout**: Limpieza automática al cerrar sesión con confirmación
- **Private Galleries**: Aislamiento total de fotos entre diferentes usuarios
- **Route Guards**: Protección automática de rutas privadas
- **Data Isolation**: Cada usuario accede solo a sus propios datos
- **Automatic Redirect**: Redirección inteligente según estado de autenticación

### Usuarios de Demostración

La aplicación incluye usuarios pre-configurados para testing:

| Usuario | Email | Contraseña | Rol |
|---------|-------|------------|-----|
| `admin` | admin@cyber.com | `admin123` | Administrador |
| `demo` | demo@cyber.com | `demo123` | Usuario estándar |
| `test` | test@cyber.com | `test123` | Usuario de pruebas |

## 📸 Sistema de Fotos

### Funcionalidades Principales

- **📷 Captura**: Acceso directo a cámara del dispositivo con calidad 100%
- **📁 Almacenamiento**: Guardado local con nombres únicos por usuario y timestamp
- **📱 Visualización**: Grid responsivo (2-4 columnas) con efectos cyberpunk
- **🗑️ Eliminación inteligente**: 
  - Confirmación antes de eliminar
  - Validación de índices y referencias
  - Eliminación de archivo físico y metadata
  - Feedback visual con toasts de éxito/error
- **🔄 Persistencia**: Mantiene fotos entre sesiones y cambios de usuario
- **🔒 Privacidad**: Aislamiento total entre usuarios diferentes

### Características Avanzadas

- **Manejo de errores robusto**: Recuperación automática de fotos corruptas
- **Logging detallado**: Seguimiento completo de operaciones para debugging
- **Validación de integridad**: Verificación de consistencia entre archivo y metadata
- **Limpieza automática**: Eliminación de fotos inválidas al cargar la galería
- **Cambio de usuario**: Limpieza y recarga automática al cambiar de sesión

### Estructura de Almacenamiento

```typescript
// Claves de almacenamiento por usuario
Storage Keys: 
  - "photos_user_1" → [metadata de fotos del usuario 1]
  - "photos_user_2" → [metadata de fotos del usuario 2]
  - "auth_token"    → token JWT del usuario actual

// Archivos físicos con nombres únicos
File Names: 
  - "user_1_1642534567890.jpeg" → Usuario 1, timestamp
  - "user_2_1642534567891.jpeg" → Usuario 2, timestamp

// Estructura de metadata
interface Photo {
  filepath: string;        // Ruta del archivo físico
  webviewPath?: string;    // URL para visualización web
}
```

### Flujo de Operaciones

#### Captura de Foto
1. Usuario toca botón FAB → Se abre cámara
2. Captura foto → Conversión a base64
3. Genera nombre único → `user_{id}_{timestamp}.jpeg`
4. Guarda archivo físico → Directory.Data
5. Añade metadata → Array de fotos del usuario
6. Persiste en storage → `photos_user_{id}`

#### Eliminación de Foto
1. Usuario selecciona foto → ActionSheet con opciones
2. Confirma eliminación → Diálogo de confirmación
3. Valida índices → Verificación de consistencia
4. Elimina archivo físico → Filesystem.deleteFile()
5. Actualiza array → Splice del índice correspondiente
6. Persiste cambios → Storage.set() con nueva lista
7. Muestra feedback → Toast de éxito/error

## 🧪 Testing y Desarrollo

### Comandos Útiles

```bash
# Desarrollo local
ionic serve

# Construcción para producción
ionic build --prod

# Linting de código
ng lint

# Ejecutar tests
ng test

# Sincronizar con dispositivos
ionic capacitor sync
```

## 🐛 Solución de Problemas

### Problemas Comunes

#### 1. **Cámara no funciona en navegador**
```bash
# Solución:
- Usar HTTPS o localhost
- Verificar permisos del navegador (Configuración → Privacidad → Cámara)
- En Chrome: chrome://settings/content/camera
```

#### 2. **Fotos no se guardan o eliminan**
```bash
# Verificar:
- Permisos de escritura en el dispositivo
- Espacio de almacenamiento disponible
- Consola del navegador para errores de Filesystem
```

#### 3. **No puede eliminar fotos**
```bash
# Posibles causas:
- Foto ya eliminada del sistema de archivos
- Índice desincronizado en el array
- Error de autenticación del usuario

# Solución:
- Recargar la galería (logout/login)
- Verificar logs en consola
- Limpiar storage: localStorage.clear()
```

#### 4. **Usuarios comparten fotos**
```bash
# Ya solucionado en v2.0+
# Si persiste:
- Verificar que cada usuario tiene ID único
- Comprobar claves de storage en DevTools
- Hacer logout/login para refrescar estado
```

#### 5. **Estilos no se aplican**
```bash
# Soluciones:
ionic serve --lab          # Modo laboratorio
ctrl + F5                   # Recarga forzada
npm run build --prod        # Build de producción
```

#### 6. **Problemas de autenticación**
```bash
# Solución:
- Limpiar storage: localStorage.clear()
- Reiniciar servidor de desarrollo
- Verificar credenciales en la tabla de usuarios demo
```

### Logs y Debugging Avanzado

#### Abrir DevTools → Console para monitorear:

**Estados de Autenticación:**
```javascript
// En consola del navegador:
localStorage.getItem('auth_token')     // Token actual
localStorage.getItem('current_user')   // Usuario actual
```

**Operaciones de Fotos:**
```javascript
// Ver todas las claves de storage:
Object.keys(localStorage).filter(key => key.includes('photos_'))

// Ver fotos de un usuario específico:
localStorage.getItem('photos_user_1')
```

**Debugging del PhotoService:**
- Logs detallados de captura: `"Archivo físico eliminado: ..."`
- Logs de eliminación: `"Foto removida de la posición X"`
- Errores de filesystem: `"Error eliminando archivo físico"`

**Debugging del AuthService:**
- Estados de login: `"Usuario autenticado: ..."`
- Cambios de sesión: `"Logout exitoso"`
- Errores de autenticación: `"Credenciales inválidas"`

### Reset Completo

```bash
# Si todo falla, reset completo:

# 1. Limpiar datos del navegador
localStorage.clear();
sessionStorage.clear();

# 2. Reiniciar servidor
Ctrl+C
ionic serve

# 3. Limpiar cache de npm
npm start --reset-cache
```

## 📄 Changelog

### v2.1.0 (Actual) - Mejoras de Eliminación
- ✅ Corrección del bug de eliminación de fotos
- ✅ Diálogo de confirmación antes de eliminar
- ✅ Manejo robusto de errores con try/catch
- ✅ Validación de índices y referencias de fotos
- ✅ Feedback visual con toasts de éxito/error
- ✅ Logging detallado para debugging

### v2.0.0 - Sistema Multi-Usuario
- ✅ Sistema de autenticación completo (login/registro)
- ✅ Galerías privadas separadas por usuario
- ✅ Protección de rutas con guards
- ✅ Botón de logout con confirmación
- ✅ Header con información del usuario
- ✅ Manejo de cambios de usuario

### v1.0.0 - Versión Base
- ✅ Captura de fotos con cámara
- ✅ Almacenamiento local de imágenes
- ✅ Grid responsivo de fotos
- ✅ Diseño cyberpunk con efectos neón
- ✅ Aplicación híbrida con Ionic + Angular

## 🕰️ Estado Actual

✅ **Sistema estable y funcional**  
✅ **Bug de eliminación resuelto**  
✅ **Multi-usuario operativo**  
✅ **Documentación actualizada**  
🚧 **Mejoras continuas en desarrollo**  

## 📝 Licencia

Proyecto educativo desarrollado para aprendizaje de tecnologías híbridas.

---

<p align="center">
  <strong>🚀 Galera Cyber v2.1.0 - Ionic 8 + Angular 20 🚀</strong><br>
  <em>Una experiencia cyberpunk completa con autenticación y galerías privadas</em>
</p>
