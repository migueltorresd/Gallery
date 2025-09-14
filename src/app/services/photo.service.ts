import { Injectable } from '@angular/core';
import { Camera, CameraPhoto, CameraResultType, CameraSource } from '@capacitor/camera';
import { Photo } from '../models/photo.interface';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@ionic/storage-angular';

/**
 * Servicio para la gestión de fotos en la aplicación
 * 
 * Este servicio maneja todas las operaciones relacionadas con fotos:
 * - Captura de fotos usando la cámara del dispositivo
 * - Almacenamiento local de archivos de imagen
 * - Persistencia de metadatos en storage
 * - Carga y eliminación de fotos
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
  /** Array que contiene todas las fotos cargadas en memoria */
  public photos: Photo[] = [];
  
  /** Clave utilizada para almacenar fotos en el storage local */
  private readonly PHOTO_STORAGE_KEY = 'photos';

  /**
   * Constructor del servicio
   * @param storage - Servicio de almacenamiento de Ionic
   */
  constructor(private storage: Storage) { 
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
   * Captura una nueva foto usando la cámara del dispositivo y la agrega a la galería
   * 
   * Este método:
   * 1. Abre la cámara del dispositivo
   * 2. Captura una foto de alta calidad
   * 3. Guarda la imagen en el sistema de archivos
   * 4. Añade la foto al principio del array de fotos
   * 5. Persiste los cambios en el almacenamiento local
   * 
   * @returns Promise<void>
   * @throws Error si hay problemas con la cámara o almacenamiento
   */
  public async addNewPhoto(): Promise<void> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    // Guardar la imagen capturada en el sistema de archivos
    const savedImageFile = await this.savePicture(capturedPhoto);
    
    // Añadir la nueva foto al principio del array
    this.photos.unshift(savedImageFile);
    
    // Persistir la lista actualizada en el almacenamiento local
    await this.storage.set(this.PHOTO_STORAGE_KEY, this.photos);
  }

  /**
   * Guarda una foto capturada en el sistema de archivos del dispositivo
   * 
   * @param cameraPhoto - Objeto CameraPhoto obtenido de la cámara
   * @returns Promise<Photo> - Objeto con información de la foto guardada
   */
  public async savePicture(cameraPhoto: CameraPhoto): Promise<Photo> {
    // Convertir la foto a formato base64
    const base64Data = await this.readAsBase64(cameraPhoto);
    
    // Generar nombre de archivo único usando timestamp
    const fileName = new Date().getTime() + '.jpeg';
    
    // Escribir la foto en el directorio de datos de la aplicación
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
   * Carga todas las fotos guardadas desde el almacenamiento local
   * 
   * Este método:
   * 1. Recupera la lista de fotos del storage
   * 2. Lee cada archivo físico del sistema de archivos
   * 3. Convierte las imágenes a base64 para visualización web
   * 4. Actualiza el array de fotos en memoria
   * 
   * @returns Promise<void>
   * @throws Error si hay problemas al leer archivos
   */
  public async loadSavedPhotos(): Promise<void> {
    // Recuperar lista de metadatos de fotos del storage
    const photoList = await this.storage.get(this.PHOTO_STORAGE_KEY);
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
      }
    }
  }

  /**
   * Elimina una foto específica de la galería
   * 
   * Este método:
   * 1. Remueve la foto del array en memoria
   * 2. Actualiza el almacenamiento local
   * 3. Elimina el archivo físico del dispositivo
   * 
   * @param photo - Objeto Photo a eliminar
   * @param position - Índice de la foto en el array
   * @returns Promise<void>
   */
  public async deletePhoto(photo: Photo, position: number): Promise<void> {
    // Remover foto del array en memoria
    this.photos.splice(position, 1);

    // Actualizar lista en almacenamiento persistente
    await this.storage.set(this.PHOTO_STORAGE_KEY, this.photos);

    // Intentar eliminar el archivo físico del dispositivo
    try {
      await Filesystem.deleteFile({
        path: photo.filepath,
        directory: Directory.Data
      });
    } catch (error) {
      console.error('Error eliminando archivo físico:', error);
      // No relanzar el error para evitar interrumpir la operación
    }
  }
}
