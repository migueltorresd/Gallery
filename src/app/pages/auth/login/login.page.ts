import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { LoginRequest, ApiError } from '../../../models/auth.interface';

/**
 * Página de Inicio de Sesión
 * 
 * Permite a los usuarios autenticarse en la aplicación usando:
 * - Formularios reactivos con validación
 * - Integración con AuthService para JWT
 * - Estados de carga y manejo de errores
 * - Diseño cyberpunk consistente
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class LoginPage implements OnInit {

  /** Formulario reactivo de login */
  loginForm!: FormGroup;
  
  /** Indica si la contraseña está visible */
  showPassword: boolean = false;
  
  /** Indica si se está procesando el login */
  isLoading: boolean = false;

  /**
   * Constructor de LoginPage
   * @param formBuilder - Constructor de formularios reactivos
   * @param authService - Servicio de autenticación
   * @param router - Servicio de navegación
   * @param loadingController - Controlador de loading
   * @param alertController - Controlador de alertas
   * @param toastController - Controlador de toasts
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.createLoginForm();
  }

  /**
   * Hook de inicialización del componente
   */
  ngOnInit() {
    // Verificar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/gallery']);
    }
  }

  /**
   * Crea el formulario reactivo de login con validaciones
   */
  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }

  /**
   * Procesa el envío del formulario de login
   */
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const credentials: LoginRequest = this.loginForm.value;
    
    // Mostrar indicador de carga
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    this.isLoading = true;

    // Intentar login
    this.authService.login(credentials).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.isLoading = false;
        
        // Mostrar mensaje de éxito
        await this.showSuccessToast(`¡Bienvenido, ${response.user.fullName}!`);
        
        // Navegar a la galería
        this.router.navigate(['/gallery']);
      },
      error: async (error: ApiError) => {
        await loading.dismiss();
        this.isLoading = false;
        
        // Mostrar error
        await this.showErrorAlert(error.message);
      }
    });
  }

  /**
   * Navega a la página de registro
   */
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Auto-completa el formulario con credenciales demo
   * @param userType - Tipo de usuario demo (admin o demo)
   */
  fillDemoCredentials(userType: 'admin' | 'demo'): void {
    const credentials = {
      admin: { username: 'admin', password: 'admin123' },
      demo: { username: 'demo', password: 'demo123' }
    };

    const selectedCredentials = credentials[userType];
    
    this.loginForm.patchValue({
      username: selectedCredentials.username,
      password: selectedCredentials.password
    });

    // Marcar los campos como tocados para activar validaciones
    this.loginForm.get('username')?.markAsTouched();
    this.loginForm.get('password')?.markAsTouched();
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName - Nombre del campo
   * @returns Mensaje de error o cadena vacía
   */
  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    
    return '';
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   * @param fieldName - Nombre del campo
   * @returns true si tiene errores, false en caso contrario
   */
  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  /**
   * Obtiene el nombre de visualización de un campo
   * @param fieldName - Nombre del campo
   * @returns Nombre legible del campo
   */
  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      username: 'Usuario',
      password: 'Contraseña'
    };
    return displayNames[fieldName] || fieldName;
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Muestra un toast de éxito
   * @param message - Mensaje a mostrar
   */
  private async showSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  /**
   * Muestra una alerta de error
   * @param message - Mensaje de error
   */
  private async showErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error de Autenticación',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
