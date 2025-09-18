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

- **🔐 Autenticación JWT completa** con login/registro y manejo de sesiones
- **📸 Captura de fotos** usando la cámara del dispositivo
- **👤 Galerías privadas** - cada usuario tiene su propia colección de fotos
- **🎨 Diseño cyberpunk** con efectos neón, holográficos y animaciones
- **📱 Responsive design** optimizado para móviles y escritorio
- **🔄 Persistencia de datos** con Ionic Storage
- **🚀 Multiplataforma** - web, iOS y Android

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

| Usuario | Contraseña | Descripción |
|---------|------------|-------------|
| `admin` | `admin123` | Administrador del sistema |
| `demo`  | `demo123`  | Usuario demostración |

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

1. **Login/Register** → Usuario ingresa credenciales
2. **JWT Generation** → Sistema genera token simulado
3. **Storage** → Token se almacena localmente
4. **State Management** → Estado reactivo con RxJS
5. **Route Protection** → Redirección según autenticación

### Seguridad

- **JWT Tokens**: Simulación de tokens JWT con payload
- **Session Management**: Gestión automática de sesiones
- **Auto-logout**: Limpieza automática al cerrar sesión
- **Private Galleries**: Aislamiento total entre usuarios

## 📸 Sistema de Fotos

### Funcionalidades

- **Captura**: Acceso directo a cámara del dispositivo
- **Almacenamiento**: Guardado local con nombres únicos por usuario
- **Visualización**: Grid responsivo con efectos cyberpunk
- **Eliminación**: Borrado de archivo físico y metadata
- **Persistencia**: Mantiene fotos entre sesiones

### Almacenamiento por Usuario

```typescript
// Estructura de almacenamiento
Storage Keys: "photos_user_1", "photos_user_2", etc.
File Names: "user_1_1234567890.jpeg", "user_2_1234567891.jpeg"
```

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

1. **Cámara no funciona en navegador**
   - Usar HTTPS o localhost
   - Verificar permisos del navegador

2. **Fotos no se guardan**
   - Verificar permisos de escritura
   - Comprobar espacio de almacenamiento

3. **Estilos no se aplican**
   - Limpiar cache: `ionic serve --lab`
   - Verificar imports de SCSS

### Logs y Debugging

Los servicios incluyen logging detallado. Abrir DevTools → Console para ver:
- Estados de autenticación
- Operaciones de archivo
- Errores y warnings

## 📝 Licencia

Proyecto educativo desarrollado para aprendizaje de tecnologías híbridas.

---

<p align="center">
  <strong>🚀 Desarrollado con Ionic 8 + Angular 20 🚀</strong><br>
  <em>Una experiencia cyberpunk en el mundo de las aplicaciones híbridas</em>
</p>
