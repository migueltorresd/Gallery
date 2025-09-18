import { Injectable, Inject, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  AuthState, 
  ApiError 
} from '../models/auth.interface';

/**
 * Servicio de Autenticación con JWT
 * 
 * Maneja todas las operaciones relacionadas con la autenticación de usuarios:
 * - Inicio de sesión y registro
 * - Gestión de tokens JWT
 * - Estado de autenticación global
 * - Almacenamiento persistente de sesión
 * - Simulación de API REST para desarrollo
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Clave para almacenar el token en storage local */
  private readonly TOKEN_STORAGE_KEY = 'auth_token';
  
  /** Clave para almacenar datos del usuario en storage local */
  private readonly USER_STORAGE_KEY = 'auth_user';
  
  /** Clave para almacenar el refresh token */
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  /** Estado de autenticación reactivo para toda la aplicación */
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    currentUser: null,
    token: null,
    loading: false,
    error: null
  });

  /** Observable público del estado de autenticación */
  public authState$ = this.authStateSubject.asObservable();

  /** Base de datos simulada de usuarios para desarrollo */
  private mockUsers: User[] = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@galeria-cyber.com',
      fullName: 'Administrador del Sistema',
      createdAt: '2024-01-01T00:00:00Z',
      avatar: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      username: 'demo',
      email: 'demo@galeria-cyber.com',
      fullName: 'Usuario Demo',
      createdAt: '2024-01-15T10:30:00Z'
    }
  ];

  /**
   * Constructor del servicio de autenticación
   * @param storage - Servicio de almacenamiento persistente de Ionic
   */
  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  /**
   * Inicializa el servicio y restaura el estado de autenticación
   * Este método se ejecuta automáticamente al crear el servicio
   */
  private async init(): Promise<void> {
    // Inicializar storage
    await this.storage.create();
    
    // Intentar restaurar sesión previa
    await this.restoreAuthState();
  }

  /**
   * Restaura el estado de autenticación desde el almacenamiento local
   * Útil para mantener la sesión entre reinicios de la aplicación
   */
  private async restoreAuthState(): Promise<void> {
    try {
      const [token, userData] = await Promise.all([
        this.storage.get(this.TOKEN_STORAGE_KEY),
        this.storage.get(this.USER_STORAGE_KEY)
      ]);

      if (token && userData && this.isTokenValid(token)) {
        // Restaurar estado de autenticación
        this.updateAuthState({
          isAuthenticated: true,
          currentUser: userData,
          token: token,
          loading: false,
          error: null
        });
      } else {
        // Limpiar datos inválidos
        await this.clearStorageData();
      }
    } catch (error) {
      console.error('Error restaurando estado de autenticación:', error);
      await this.clearStorageData();
    }
  }

  /**
   * Inicia sesión de usuario con credenciales
   * 
   * @param credentials - Datos de login (usuario/email y contraseña)
   * @returns Observable con la respuesta de autenticación
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Actualizar estado: cargando
    this.updateAuthState({ ...this.currentAuthState, loading: true, error: null });

    // Simular delay de red (eliminar en producción con API real)
    return new Observable(observer => {
      setTimeout(async () => {
        try {
          const authResponse = await this.simulateLogin(credentials);
          
          // Guardar datos de autenticación
          await this.saveAuthData(authResponse);
          
          // Actualizar estado: autenticado
          this.updateAuthState({
            isAuthenticated: true,
            currentUser: authResponse.user,
            token: authResponse.token,
            loading: false,
            error: null
          });

          observer.next(authResponse);
          observer.complete();
        } catch (error) {
          const apiError = error as ApiError;
          
          // Actualizar estado: error
          this.updateAuthState({
            ...this.currentAuthState,
            loading: false,
            error: apiError.message
          });

          observer.error(apiError);
        }
      }, 1500); // Simular 1.5 segundos de delay
    });
  }

  /**
   * Registra un nuevo usuario en el sistema
   * 
   * @param userData - Datos del nuevo usuario
   * @returns Observable con la respuesta de autenticación
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Actualizar estado: cargando
    this.updateAuthState({ ...this.currentAuthState, loading: true, error: null });

    return new Observable(observer => {
      setTimeout(async () => {
        try {
          const authResponse = await this.simulateRegister(userData);
          
          // Guardar datos de autenticación
          await this.saveAuthData(authResponse);
          
          // Actualizar estado: autenticado
          this.updateAuthState({
            isAuthenticated: true,
            currentUser: authResponse.user,
            token: authResponse.token,
            loading: false,
            error: null
          });

          observer.next(authResponse);
          observer.complete();
        } catch (error) {
          const apiError = error as ApiError;
          
          // Actualizar estado: error
          this.updateAuthState({
            ...this.currentAuthState,
            loading: false,
            error: apiError.message
          });

          observer.error(apiError);
        }
      }, 1500);
    });
  }

  /**
   * Cierra la sesión del usuario actual
   * Limpia todos los datos de autenticación almacenados
   */
  async logout(): Promise<void> {
    // Limpiar almacenamiento
    await this.clearStorageData();
    
    // Actualizar estado: no autenticado
    this.updateAuthState({
      isAuthenticated: false,
      currentUser: null,
      token: null,
      loading: false,
      error: null
    });
  }

  /**
   * Verifica si el usuario actual está autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated;
  }

  /**
   * Obtiene el usuario actualmente autenticado
   * @returns Usuario actual o null si no está autenticado
   */
  getCurrentUser(): User | null {
    return this.currentAuthState.currentUser;
  }

  /**
   * Obtiene el token JWT actual
   * @returns Token actual o null si no está autenticado
   */
  getToken(): string | null {
    return this.currentAuthState.token;
  }

  /**
   * Obtiene el estado actual de autenticación
   * @returns Estado completo de autenticación
   */
  private get currentAuthState(): AuthState {
    return this.authStateSubject.value;
  }

  /**
   * Actualiza el estado de autenticación y notifica a los suscriptores
   * @param newState - Nuevo estado de autenticación
   */
  private updateAuthState(newState: AuthState): void {
    this.authStateSubject.next(newState);
  }

  /**
   * Guarda los datos de autenticación en el almacenamiento persistente
   * @param authResponse - Respuesta de autenticación del servidor
   */
  private async saveAuthData(authResponse: AuthResponse): Promise<void> {
    await Promise.all([
      this.storage.set(this.TOKEN_STORAGE_KEY, authResponse.token),
      this.storage.set(this.USER_STORAGE_KEY, authResponse.user),
      this.storage.set(this.REFRESH_TOKEN_KEY, authResponse.refreshToken)
    ]);
  }

  /**
   * Limpia todos los datos de autenticación del almacenamiento
   */
  private async clearStorageData(): Promise<void> {
    await Promise.all([
      this.storage.remove(this.TOKEN_STORAGE_KEY),
      this.storage.remove(this.USER_STORAGE_KEY),
      this.storage.remove(this.REFRESH_TOKEN_KEY)
    ]);
  }

  /**
   * Verifica si un token JWT es válido (simulado)
   * @param token - Token a verificar
   * @returns true si es válido, false en caso contrario
   */
  private isTokenValid(token: string): boolean {
    if (!token) return false;
    
    // En una aplicación real, aquí decodificarías el JWT y verificarías su expiración
    // Por ahora, simulamos que todos los tokens son válidos
    try {
      // Simulación básica: un token válido debe tener al menos 20 caracteres
      return token.length > 20;
    } catch {
      return false;
    }
  }

  /**
   * Simula el proceso de login con una API REST
   * En producción, esto sería una llamada HTTP real
   * 
   * @param credentials - Credenciales de login
   * @returns Promesa con respuesta de autenticación
   */
  private async simulateLogin(credentials: LoginRequest): Promise<AuthResponse> {
    // Buscar usuario por username o email
    const user = this.mockUsers.find(u => 
      u.username === credentials.username || u.email === credentials.username
    );

    // Simular validación de contraseña (en real sería hasheada)
    const validCredentials = {
      admin: 'admin123',
      demo: 'demo123'
    };

    if (!user || validCredentials[user.username as keyof typeof validCredentials] !== credentials.password) {
      throw {
        message: 'Credenciales inválidas',
        code: 'INVALID_CREDENTIALS',
        status: 401
      } as ApiError;
    }

    // Generar token JWT simulado
    const token = this.generateMockJWT(user);
    const refreshToken = this.generateMockRefreshToken();

    return {
      token,
      refreshToken,
      user,
      expiresIn: 3600, // 1 hora
      tokenType: 'Bearer'
    };
  }

  /**
   * Simula el proceso de registro con una API REST
   * 
   * @param userData - Datos del nuevo usuario
   * @returns Promesa con respuesta de autenticación
   */
  private async simulateRegister(userData: RegisterRequest): Promise<AuthResponse> {
    // Validar que las contraseñas coincidan
    if (userData.password !== userData.confirmPassword) {
      throw {
        message: 'Las contraseñas no coinciden',
        code: 'PASSWORD_MISMATCH',
        status: 400
      } as ApiError;
    }

    // Verificar que el username no exista
    const existingUser = this.mockUsers.find(u => 
      u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      throw {
        message: 'El usuario o email ya existe',
        code: 'USER_EXISTS',
        status: 409
      } as ApiError;
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: this.mockUsers.length + 1,
      username: userData.username,
      email: userData.email,
      fullName: userData.fullName,
      createdAt: new Date().toISOString()
    };

    // Agregar a la "base de datos" simulada
    this.mockUsers.push(newUser);

    // Generar token JWT
    const token = this.generateMockJWT(newUser);
    const refreshToken = this.generateMockRefreshToken();

    return {
      token,
      refreshToken,
      user: newUser,
      expiresIn: 3600,
      tokenType: 'Bearer'
    };
  }

  /**
   * Genera un token JWT simulado para desarrollo
   * En producción, esto lo haría el servidor
   * 
   * @param user - Usuario para quien generar el token
   * @returns Token JWT simulado
   */
  private generateMockJWT(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      username: user.username,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600 // 1 hora
    }));
    const signature = btoa('mock-signature-for-development');
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Genera un refresh token simulado
   * @returns Refresh token simulado
   */
  private generateMockRefreshToken(): string {
    return btoa(`refresh-token-${Date.now()}-${Math.random()}`);
  }
}