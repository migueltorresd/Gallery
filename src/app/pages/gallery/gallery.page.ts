import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { PhotoService } from '../../services/photo.service';
import { AuthService } from '../../services/auth.service';
import { Photo } from '../../models/photo.interface';
import { User } from '../../models/auth.interface';

/**
 * Componente principal de la página de galería de fotos
 * 
 * Este componente maneja la visualización e interacción con la galería de fotos:
 * - Muestra un grid responsivo de fotos
 * - Permite capturar nuevas fotos mediante botón FAB
 * - Proporciona opciones para eliminar fotos individuales
 * - Maneja estados vacíos cuando no hay fotos
 * - Incluye funcionalidad de logout y info del usuario
 * 
 * Características:
 * - Diseño responsivo (2 columnas en móvil, 3-4 en tablet/desktop)
 * - Tema cyberpunk con animaciones
 * - ActionSheet para acciones de fotos
 * - Carga automática de fotos guardadas al inicializar
 * - Header con info del usuario y botón de logout
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
export class GalleryPage implements OnInit, OnDestroy {

  /** Usuario actualmente autenticado */
  currentUser: User | null = null;
  
  /** ID del usuario previo para detectar cambios */
  private previousUserId: number | null = null;
  
  /** Suscripción al estado de autenticación */
  private authSubscription: Subscription = new Subscription();

  /**
   * Constructor del componente
   * @param photoService - Servicio para gestión de fotos (público para uso en plantilla)
   * @param authService - Servicio de autenticación
   * @param router - Servicio de navegación
   * @param actionSheetController - Controlador para mostrar hojas de acciones
   * @param alertController - Controlador para alertas
   * @param toastController - Controlador para toasts
   */
  constructor(
    public photoService: PhotoService,
    private authService: AuthService,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
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
   * Carga todas las fotos guardadas previamente y suscribe al estado de autenticación
   */
  async ngOnInit(): Promise<void> {
    // Suscribirse al estado de autenticación para obtener el usuario actual
    this.authSubscription = this.authService.authState$.subscribe(async authState => {
      // Si no está autenticado, redirigir al login
      if (!authState.isAuthenticated) {
        this.photoService.clearUserPhotos();
        this.currentUser = null;
        this.previousUserId = null;
        this.router.navigate(['/login']);
        return;
      }
      
      const newUser = authState.currentUser;
      
      // Detectar cambio de usuario
      if (newUser && this.previousUserId !== null && this.previousUserId !== newUser.id) {
        console.log('Cambio de usuario detectado. Limpiando fotos...');
        this.photoService.clearUserPhotos();
      }
      
      // Actualizar usuario actual
      this.currentUser = newUser;
      this.previousUserId = newUser?.id || null;
      
      // Cargar fotos del usuario actual
      if (newUser) {
        await this.photoService.loadSavedPhotos();
      }
    });
  }
  
  /**
   * Hook del ciclo de vida ejecutado al destruir el componente
   * Limpia las suscripciones para evitar memory leaks
   */
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Muestra una hoja de acciones con opciones para una foto seleccionada
   * Actualmente solo permite eliminar la foto con confirmación
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
          this.confirmDeletePhoto(photo, position);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  /**
   * Muestra un diálogo de confirmación antes de eliminar una foto
   * y ejecuta la eliminación con manejo de errores
   * 
   * @param photo - Objeto Foto a eliminar
   * @param position - Índice de la foto en el array
   */
  public async confirmDeletePhoto(photo: Photo, position: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro que quieres eliminar esta foto? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            try {
              await this.photoService.deletePhoto(photo, position);
              
              // Mostrar mensaje de éxito
              const toast = await this.toastController.create({
                message: 'Foto eliminada correctamente',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
            } catch (error) {
              console.error('Error al eliminar foto:', error);
              
              // Mostrar mensaje de error
              const toast = await this.toastController.create({
                message: 'Error al eliminar la foto. Inténtalo de nuevo.',
                duration: 3000,
                position: 'bottom',
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });
    
    await alert.present();
  }

  /**
   * Cierra la sesión del usuario actual
   * Muestra una confirmación antes de proceder
   */
  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que quieres cerrar tu sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Cerrar Sesión',
          role: 'destructive',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            // Cerrar sesión
            await this.authService.logout();
            
            // Mostrar mensaje de confirmación
            const toast = await this.toastController.create({
              message: 'Sesión cerrada correctamente',
              duration: 2000,
              position: 'top',
              color: 'success'
            });
            await toast.present();
            
            // Navegar al login
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    
    await alert.present();
  }
}
