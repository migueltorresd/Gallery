import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/photo.interface';

/**
 * Componente principal de la página de galería de fotos
 * 
 * Este componente maneja la visualización e interacción con la galería de fotos:
 * - Muestra un grid responsivo de fotos
 * - Permite capturar nuevas fotos mediante botón FAB
 * - Proporciona opciones para eliminar fotos individuales
 * - Maneja estados vacíos cuando no hay fotos
 * 
 * Características:
 * - Diseño responsivo (2 columnas en móvil, 3-4 en tablet/desktop)
 * - Tema cyberpunk con animaciones
 * - ActionSheet para acciones de fotos
 * - Carga automática de fotos guardadas al inicializar
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  standalone: false
})
export class GalleryPage {

  /**
   * Constructor del componente
   * @param photoService - Servicio para gestión de fotos (público para uso en plantilla)
   * @param actionSheetController - Controlador para mostrar hojas de acciones
   */
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  /**
   * Inicia el proceso de captura de una nueva foto
   * Abre la cámara del dispositivo y guarda la imagen capturada
   */
  async addNewPhoto(): Promise<void> {
    await this.photoService.addNewPhoto();
  }

  /**
   * Hook del ciclo de vida ejecutado al inicializar el componente
   * Carga todas las fotos guardadas previamente
   */
  async ngOnInit(): Promise<void> {
    await this.photoService.loadSavedPhotos();
  }

  /**
   * Muestra una hoja de acciones con opciones para una foto seleccionada
   * Actualmente solo permite eliminar la foto
   * 
   * @param photo - Objeto Foto seleccionado
   * @param position - Índice de la foto en el array
   */
  public async showActionSheet(photo: Photo, position: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Qué quieres hacer?',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePhoto(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
}
