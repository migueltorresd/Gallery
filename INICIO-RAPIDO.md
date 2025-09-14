# 🚀 Guía de Inicio Rápido - Galería Cyber

¡Bienvenido a tu primera aplicación Ionic! Esta guía te ayudará a configurar y ejecutar la aplicación paso a paso.

## 🎯 Objetivo

Al final de esta guía tendrás la aplicación funcionando en tu computadora y podrás capturar fotos desde tu navegador.

## 📋 Lista de Verificación Pre-instalación

Antes de comenzar, marca cada elemento cuando lo tengas listo:

- [ ] **Node.js instalado** (versión 18 o superior)
- [ ] **Git instalado** en tu computadora
- [ ] **Editor de código** (recomendamos Visual Studio Code)
- [ ] **Navegador web moderno** (Chrome, Firefox, Safari)

## 🛠️ Instalación Paso a Paso

### Paso 1: Verificar Node.js
Abre tu terminal/consola y ejecuta:

```bash
node --version
npm --version
```

Deberías ver algo como:
```
v18.17.0
9.6.7
```

Si no tienes Node.js, descárgalo desde [nodejs.org](https://nodejs.org/)

### Paso 2: Instalar Ionic CLI Global

```bash
npm install -g @ionic/cli
```

Verifica la instalación:
```bash
ionic --version
```

### Paso 3: Descargar el Proyecto

Si tienes el proyecto en GitHub:
```bash
git clone https://github.com/tu-usuario/galeria-cyber.git
cd galeria-cyber
```

Si tienes el proyecto en una carpeta local, navega hasta ella:
```bash
cd ruta/a/tu/proyecto
```

### Paso 4: Instalar Dependencias del Proyecto

```bash
npm install
```

Este comando puede tardar unos minutos. ¡Es normal!

### Paso 5: Ejecutar la Aplicación

```bash
ionic serve
```

Si todo salió bien, verás:
```
[INFO] Development server running!
       Local: http://localhost:8100
```

## 🌐 Primera Ejecución

1. **Abre tu navegador** en `http://localhost:8100`
2. **Verás la galería vacía** con el mensaje "SISTEMA VACÍO"
3. **Haz clic en el botón "+"** (botón flotante morado)
4. **Selecciona una imagen** de tu computadora
5. **¡Tu primera foto aparecerá en la galería!**

## 🎨 Explorando la Aplicación

### Funciones Principales

| Acción | Cómo hacerlo |
|--------|--------------|
| **Agregar foto** | Clic en el botón flotante "+" |
| **Ver opciones de foto** | Clic en cualquier foto |
| **Eliminar foto** | Clic en foto → "Eliminar" |
| **Cerrar opciones** | Clic en "Cancelar" |

### Diseño Responsivo
- **En móvil**: 2 fotos por fila
- **En tablet**: 3 fotos por fila  
- **En desktop**: 4 fotos por fila

## 🔧 Personalización Básica

### Cambiar el Título de la App

1. **Abre** `src/app/pages/gallery/gallery.page.html`
2. **Busca** la línea que dice `GALERÍA CYBER`
3. **Cambia** el texto por lo que quieras
4. **Guarda** el archivo
5. **La aplicación se actualizará automáticamente**

### Cambiar Colores del Tema

1. **Abre** `src/theme/variables.scss`
2. **Encuentra** las variables de color:
   ```scss
   --cyber-neon-green: #00ff00;
   --cyber-neon-blue: #00bfff;
   --cyber-neon-pink: #ff00ff;
   ```
3. **Cambia** los colores por otros que te gusten
4. **Guarda** y los cambios aparecerán inmediatamente

## 📱 Probar en Dispositivo Móvil

### Opción 1: Usando la Red Local
1. **Encuentra tu IP local**:
   - Windows: `ipconfig` en CMD
   - Mac/Linux: `ifconfig` en terminal
2. **Busca algo como**: `192.168.1.100`
3. **En tu teléfono**, abre el navegador
4. **Ve a**: `http://TU-IP:8100` (ejemplo: `http://192.168.1.100:8100`)

### Opción 2: Usando Ionic DevApp (Histórico)
Ionic DevApp ya no está disponible, pero puedes usar la opción de red local.

## 🐛 Solución de Problemas Comunes

### Error: "ionic: comando no encontrado"
**Solución**: Reinstala Ionic CLI
```bash
npm uninstall -g @ionic/cli
npm install -g @ionic/cli
```

### Error: "Cannot resolve dependency"
**Solución**: Limpia e reinstala dependencias
```bash
rm -rf node_modules
npm install
```

### La aplicación no se actualiza automáticamente
**Solución**: 
1. Para la aplicación (Ctrl+C)
2. Ejecuta otra vez: `ionic serve`

### Error: "Puerto 8100 en uso"
**Solución**: Usa otro puerto
```bash
ionic serve --port 8101
```

### Las fotos no se ven
**Solución**: 
- Verifica que seleccionaste una imagen válida
- Revisa la consola del navegador (F12) por errores

## 📚 Próximos Pasos

Una vez que tengas todo funcionando:

### Para Aprender Más
1. **Lee el archivo** `README.md` completo
2. **Explora** el código en `src/app/`
3. **Modifica** estilos en los archivos `.scss`

### Para Desarrollo Móvil
1. **Instala Android Studio** (para Android)
2. **Sigue la guía** en el README para compilar APK
3. **Prueba** en dispositivos reales

### Para Personalizar
1. **Agrega nuevas páginas** con `ionic generate page nombre`
2. **Añade nuevas funciones** al `PhotoService`
3. **Experimenta** con diferentes temas de colores

## 🤝 ¿Necesitas Ayuda?

### Recursos Útiles
- **Documentación Ionic**: [ionicframework.com/docs](https://ionicframework.com/docs)
- **Angular Tutorial**: [angular.dev/tutorial](https://angular.dev/tutorial)
- **TypeScript Básico**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

### Comandos Útiles de Referencia
```bash
# Iniciar servidor de desarrollo
ionic serve

# Generar nueva página
ionic generate page nombre-pagina

# Generar nuevo servicio  
ionic generate service nombre-servicio

# Ver información del proyecto
ionic info

# Ayuda de comandos
ionic --help
```

## 🎉 ¡Felicitaciones!

Si llegaste hasta aquí, ya tienes tu primera aplicación Ionic funcionando. ¡Es un gran logro!

**Lo que has aprendido:**
- ✅ Configurar un entorno de desarrollo Ionic
- ✅ Ejecutar una aplicación híbrida
- ✅ Entender la estructura básica del proyecto
- ✅ Probar funcionalidades en el navegador
- ✅ Hacer cambios básicos de personalización

**¡Sigue experimentando y creando! 🚀**

---

*¿Te gustó esta guía? ¡Compártela con otros desarrolladores principiantes!*