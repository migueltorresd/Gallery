/**
 * Interfaz que define la estructura de un objeto Photo
 * 
 * Esta interfaz representa los metadatos y rutas de acceso
 * a una fotografía almacenada en la aplicación
 * 
 * @interface Photo
 * @author Tu Nombre
 * @version 1.0.0
 */
export interface Photo {
  /** 
   * Ruta del archivo de imagen en el sistema de archivos del dispositivo
   * Esta es la ruta física donde se almacena el archivo .jpeg
   */
  filepath: string;
  
  /** 
   * Ruta web opcional para mostrar la imagen en el navegador
   * Contiene la imagen codificada en base64 con el prefijo data:image/jpeg;base64,
   * Solo se utiliza para visualización en plataformas web
   */
  webviewPath?: string;
}
