import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController, IonicModule } from '@ionic/angular';

import { AuthService } from '../../../services/auth.service';
import { RegisterRequest, ApiError } from '../../../models/auth.interface';

/**
 * Página de Registro de Usuarios
 * 
 * Permite el registro de nuevos usuarios con:
 * - Formularios reactivos con validación completa
 * - Validación de confirmación de contraseña
 * - Integración con AuthService
 * - Diseño cyberpunk consistente
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {

  /** Formulario reactivo de registro */
  registerForm!: FormGroup;
  
  /** Indica si las contraseñas están visibles */
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  /** Indica si se está procesando el registro */
  isLoading: boolean = false;

  /**
   * Constructor de RegisterPage
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
    this.createRegisterForm();
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
   * Crea el formulario reactivo de registro con validaciones
   */
  private createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  /**
   * Validador personalizado para verificar que las contraseñas coincidan
   * @param form - FormGroup del registro
   * @returns Objeto de error o null si es válido
   */
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        const errors = { ...confirmPassword.errors };
        delete errors['passwordMismatch'];
        confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }

  /**
   * Procesa el envío del formulario de registro
   */
  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const registerData: RegisterRequest = this.registerForm.value;
    
    // Mostrar indicador de carga
    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
      spinner: 'crescent'
    });
    await loading.present();

    this.isLoading = true;

    // Intentar registro
    this.authService.register(registerData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        this.isLoading = false;
        
        // Mostrar mensaje de éxito
        await this.showSuccessToast(`¡Cuenta creada! Bienvenido, ${response.user.fullName}!`);
        
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
   * Navega de vuelta al login
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Alterna la visibilidad de la contraseña
   * @param field - Campo de contraseña ('password' o 'confirmPassword')
   */
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  /**
   * Obtiene el mensaje de error para un campo específico
   * @param fieldName - Nombre del campo
   * @returns Mensaje de error o cadena vacía
   */
  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} no puede exceder ${maxLength} caracteres`;
      }
      if (field.errors['email']) {
        return 'Email no tiene un formato válido';
      }
      if (field.errors['pattern']) {
        if (fieldName === 'username') {
          return 'Usuario solo puede contener letras, números y guiones bajos';
        }
        if (fieldName === 'password') {
          return 'Contraseña debe tener al menos una mayúscula, una minúscula y un número';
        }
      }
      if (field.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden';
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
    const field = this.registerForm.get(fieldName);
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
      email: 'Email',
      fullName: 'Nombre completo',
      password: 'Contraseña',
      confirmPassword: 'Confirmación de contraseña'
    };
    return displayNames[fieldName] || fieldName;
  }

  /**
   * Marca todos los campos del formulario como tocados para mostrar errores
   */
  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  /**
   * Muestra un toast de éxito
   * @param message - Mensaje a mostrar
   */
  private async showSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
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
      header: 'Error de Registro',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
