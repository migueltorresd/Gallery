# 📱 Galería Cyber - Aplicación Ionic

[![Ionic](https://img.shields.io/badge/Ionic-8.x-3880FF?style=flat-square&logo=ionic)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-18.x-DD0031?style=flat-square&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007acc?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-6.x-119eff?style=flat-square&logo=capacitor)](https://capacitorjs.com/)

Aplicación híbrida de galería de fotos con diseño cyberpunk futurista. Captura, almacena y gestiona fotos en web, iOS y Android.

## ⚡ Ejecución Rápida

```bash
# Clonar e instalar
git clone <repo-url>
cd miAppTienda
npm install

# Ejecutar en navegador
ionic serve
```

## 🎨 Características

- 📷 **Captura de fotos** con cámara del dispositivo
- 🖼️ **Galería responsiva** con grid adaptativo
- 💾 **Almacenamiento local** persistente
- 🗑️ **Eliminación de fotos** con confirmación
- 🌌 **Multiplataforma**: Web, iOS, Android
- 🔮 **Tema cyberpunk** con efectos neón

## 🏗️ Arquitectura del Proyecto

```
src/app/
├── models/
│   └── photo.interface.ts       # Interfaz de datos de fotos
├── pages/gallery/               # Página principal de galería
│   ├── gallery.page.ts          # Lógica del componente
│   ├── gallery.page.html        # Template HTML
│   └── gallery.page.scss        # Estilos cyberpunk
├── services/
│   └── photo.service.ts         # Servicio principal de fotos
├── app.component.ts             # Componente raíz
├── app.module.ts                # Módulo principal
└── app-routing.module.ts        # Configuración de rutas
```

### Componentes Principales

- **GalleryPage**: Página principal con grid de fotos y botón FAB
- **PhotoService**: Maneja captura, almacenamiento y eliminación de fotos
- **Photo Interface**: Define la estructura de datos de las fotos

## 🔌 Plugins de Capacitor Utilizados

| Plugin | Versión | Propósito |
|--------|---------|----------|
| `@capacitor/camera` | 6.x | **Captura de fotos**: Acceso a la cámara del dispositivo y galería |
| `@capacitor/filesystem` | 6.x | **Almacenamiento**: Guardar/leer archivos de imagen en el dispositivo |
| `@ionic/storage-angular` | 4.x | **Persistencia**: Almacenar metadatos de fotos (rutas, nombres) |

### 🔍 Por qué se eligieron estos plugins:

- **Camera**: Única forma de acceder a la cámara nativa desde una app híbrida
- **Filesystem**: Necesario para guardar imágenes físicamente en el dispositivo
- **Storage**: Para recordar qué fotos tiene la app entre sesiones

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
git clone <repo-url>
cd miAppTienda

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

## 🔧 Scripts Disponibles

```bash
ionic serve        # Desarrollo web (localhost:8100)
ionic build        # Construir para producción
ionic cap sync     # Sincronizar plugins con móviles
ionic generate     # Crear nuevos componentes/páginas
```

## 📝 Licencia

MIT License - Ver `LICENSE` para más detalles.
