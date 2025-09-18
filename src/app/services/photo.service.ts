import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { Photo } from '../models/photo.interface';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth.service';
import { User } from '../models/auth.interface';

/**
 * Servicio para la gestión de fotos en la aplicación
 * 
 * Este servicio maneja todas las operaciones relacionadas con fotos:
 * - Captura de fotos usando la cámara del dispositivo
 * - Almacenamiento local de archivos de imagen por usuario
 * - Persistencia de metadatos en storage separado por usuario
 * - Carga y eliminación de fotos del usuario activo
 * - Aislamiento completo de galerías entre usuarios
 * 
 * @author Tu Nombre
 * @version 2.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  /** Array que contiene todas las fotos del usuario actual cargadas en memoria */
  public photos: Photo[] = [];
  
  /** Prefijo base para las claves de almacenamiento por usuario */
  private readonly PHOTO_STORAGE_PREFIX = 'photos_user_';
  
  /** Prefijo base para los directorios de fotos por usuario */
  private readonly PHOTO_DIRECTORY_PREFIX = 'user_';

  /**
   * Constructor del servicio
   * @param storage - Servicio de almacenamiento de Ionic
   * @param authService - Servicio de autenticación para obtener usuario actual
   */
  constructor(
    private storage: Storage,
    private authService: AuthService
  ) { 
    this.init();
  }

  /**
   * Inicializa el servicio de almacenamiento
   * Este método debe ser llamado antes de usar cualquier funcionalidad de storage
   */
  async init(): Promise<void> {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  /**
   * Obtiene la clave de almacenamiento única para el usuario actual
   * @returns string - Clave de storage para las fotos del usuario
   */
  private getUserStorageKey(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay usuario autenticado. No se pueden gestionar fotos.');
    }
    return `${this.PHOTO_STORAGE_PREFIX}${currentUser.id}`;
  }

  /**
   * Obtiene el directorio único para almacenar fotos del usuario actual
   * @returns string - Nombre del directorio del usuario
   */
  private getUserDirectory(): string {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay usuario autenticado. No se pueden gestionar fotos.');
    }
    return `${this.PHOTO_DIRECTORY_PREFIX}${currentUser.id}`;
  }

  /**
   * Limpia las fotos en memoria cuando un usuario cierra sesión
   * Debe ser llamado desde el AuthService al hacer logout
   */
  public clearUserPhotos(): void {
    this.photos = [];
  }

  /**
   * Captura una nueva foto usando la cámara del dispositivo y la agrega a la galería del usuario actual
   * 
   * Este método:
   * 1. Verifica que hay un usuario autenticado
   * 2. Abre la cámara del dispositivo
   * 3. Captura una foto de alta calidad
   * 4. Guarda la imagen en el directorio del usuario
   * 5. Añade la foto al principio del array de fotos del usuario
   * 6. Persiste los cambios en el almacenamiento del usuario
   * 
   * @returns Promise<void>
   * @throws Error si no hay usuario autenticado o hay problemas con la cámara
   */
  public async addNewPhoto(): Promise<void> {
    // Verificar que hay un usuario autenticado
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Debes iniciar sesión para tomar fotos.');
    }

    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Guardar la imagen capturada en el directorio del usuario
    const savedImageFile = await this.savePicture(capturedPhoto);
    
    // Añadir la nueva foto al principio del array del usuario
    this.photos.unshift(savedImageFile);
    
    // Persistir la lista actualizada en el almacenamiento del usuario
    const userStorageKey = this.getUserStorageKey();
    await this.storage.set(userStorageKey, this.photos);
  }

  /**
   * Guarda una foto capturada en el directorio específico del usuario autenticado
   * 
   * @param cameraPhoto - Objeto CameraPhoto obtenido de la cámara
   * @returns Promise<Photo> - Objeto con información de la foto guardada
   */
  public async savePicture(cameraPhoto: CameraPhoto): Promise<Photo> {
    // Convertir la foto a formato base64
    const base64Data = await this.readAsBase64(cameraPhoto);
    
    // Obtener directorio del usuario actual
    const userDirectory = this.getUserDirectory();
    
    // Generar nombre de archivo único usando timestamp y usuario
    const fileName = `${userDirectory}_${new Date().getTime()}.jpeg`;
    
    // Escribir la foto en el directorio de datos con nombre único por usuario
    const savedFile = await Filesystem.writeFile({
      path : fileName,
      data : base64Data,
      directory : Directory.Data
    });

    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  /**
   * Lee una foto y la convierte a formato base64
   * 
   * @param cameraPhoto - Objeto CameraPhoto a convertir
   * @returns Promise<string> - Datos de la imagen en formato base64
   */
  public async readAsBase64(cameraPhoto: CameraPhoto): Promise<string> {
    // Obtener los datos de la foto desde la URL web
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  /**
   * Convierte un objeto Blob a string base64
   * 
   * @param blob - Objeto Blob a convertir
   * @returns Promise<unknown> - String base64 de la imagen
   */
  convertBlobToBase64 = (blob: Blob): Promise<unknown> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  /**
   * Carga todas las fotos guardadas del usuario autenticado desde el almacenamiento local
   * 
   * Este método:
   * 1. Verifica que hay un usuario autenticado
   * 2. Recupera la lista de fotos del storage del usuario
   * 3. Lee cada archivo físico del sistema de archivos
   * 4. Convierte las imágenes a base64 para visualización web
   * 5. Actualiza el array de fotos en memoria
   * 
   * @returns Promise<void>
   * @throws Error si no hay usuario autenticado o hay problemas al leer archivos
   */
  public async loadSavedPhotos(): Promise<void> {
    // Verificar que hay un usuario autenticado
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.warn('No hay usuario autenticado. No se pueden cargar fotos.');
      this.photos = [];
      return;
    }

    // Recuperar lista de metadatos de fotos del storage del usuario
    const userStorageKey = this.getUserStorageKey();
    const photoList = await this.storage.get(userStorageKey);
    this.photos = photoList || [];

    // Cargar contenido de cada foto para visualización
    for (let photo of this.photos) {
      try {
        // Leer cada archivo de imagen del sistema de archivos
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });
        
        // Convertir a data URL para visualización en navegador
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      } catch (error) {
        console.error(`Error cargando foto ${photo.filepath}:`, error);
        // Remover foto inválida de la lista
        const index = this.photos.indexOf(photo);
        if (index > -1) {
          this.photos.splice(index, 1);
        }
      }
    }
    
    // Guardar lista actualizada (sin fotos inválidas)
    await this.storage.set(userStorageKey, this.photos);
  }

  /**
   * Elimina una foto específica de la galería del usuario autenticado
   * 
   * Este método:
   * 1. Verifica que hay un usuario autenticado
   * 2. Valida que el índice sea válido
   * 3. Elimina el archivo físico del dispositivo primero
   * 4. Remueve la foto del array en memoria del usuario
   * 5. Actualiza el almacenamiento del usuario
   * 
   * @param photo - Objeto Photo a eliminar
   * @param position - Índice de la foto en el array
   * @returns Promise<void>
   * @throws Error si no hay usuario autenticado, índice inválido o error al eliminar
   */
  public async deletePhoto(photo: Photo, position: number): Promise<void> {
    // Verificar que hay un usuario autenticado
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Debes iniciar sesión para eliminar fotos.');
    }

    // Validar que el índice es válido
    if (position < 0 || position >= this.photos.length) {
      throw new Error('Índice de foto inválido.');
    }

    // Verificar que la foto en la posición coincide con la foto a eliminar
    if (this.photos[position] !== photo) {
      throw new Error('La foto seleccionada no coincide con la posición especificada.');
    }

    // Eliminar el archivo físico del dispositivo primero
    try {
      await Filesystem.deleteFile({
        path: photo.filepath,
        directory: Directory.Data
      });
      console.log(`Archivo físico eliminado: ${photo.filepath}`);
    } catch (error) {
      console.error('Error eliminando archivo físico:', error);
      // Continuar con la eliminación de la lista incluso si el archivo físico falló
      // El archivo podría ya no existir
    }

    // Remover foto del array en memoria del usuario
    this.photos.splice(position, 1);
    console.log(`Foto removida de la posición ${position}. Fotos restantes: ${this.photos.length}`);

    // Actualizar lista en almacenamiento persistente del usuario
    const userStorageKey = this.getUserStorageKey();
    await this.storage.set(userStorageKey, this.photos);
    console.log('Lista de fotos actualizada en storage');
  }
}
