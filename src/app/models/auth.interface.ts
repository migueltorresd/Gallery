/**
 * Interfaces para el sistema de autenticación con JWT
 * 
 * Define las estructuras de datos utilizadas en el proceso de autenticación,
 * incluyendo usuarios, solicitudes de login/registro y respuestas del servidor.
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */

/**
 * Interfaz que representa un usuario en el sistema
 * 
 * @interface User
 */
export interface User {
  /** Identificador único del usuario */
  id: number;
  
  /** Nombre de usuario único para login */
  username: string;
  
  /** Dirección de correo electrónico del usuario */
  email: string;
  
  /** Nombre completo del usuario */
  fullName: string;
  
  /** Fecha de creación de la cuenta */
  createdAt?: string;
  
  /** URL del avatar del usuario (opcional) */
  avatar?: string;
}

/**
 * Interfaz para la solicitud de inicio de sesión
 * 
 * @interface LoginRequest
 */
export interface LoginRequest {
  /** Nombre de usuario o email para login */
  username: string;
  
  /** Contraseña del usuario */
  password: string;
}

/**
 * Interfaz para la solicitud de registro de nuevo usuario
 * 
 * @interface RegisterRequest
 */
export interface RegisterRequest {
  /** Nombre de usuario deseado */
  username: string;
  
  /** Correo electrónico del nuevo usuario */
  email: string;
  
  /** Contraseña para la nueva cuenta */
  password: string;
  
  /** Confirmación de contraseña */
  confirmPassword: string;
  
  /** Nombre completo del usuario */
  fullName: string;
}

/**
 * Interfaz para la respuesta del servidor tras autenticación exitosa
 * 
 * @interface AuthResponse
 */
export interface AuthResponse {
  /** Token JWT para autenticación */
  token: string;
  
  /** Token de actualización (refresh token) */
  refreshToken: string;
  
  /** Información del usuario autenticado */
  user: User;
  
  /** Tiempo de expiración del token en segundos */
  expiresIn: number;
  
  /** Tipo de token (normalmente "Bearer") */
  tokenType: string;
}

/**
 * Interfaz para respuestas de error de la API
 * 
 * @interface ApiError
 */
export interface ApiError {
  /** Mensaje de error legible para el usuario */
  message: string;
  
  /** Código de error específico */
  code: string;
  
  /** Detalles adicionales del error (opcional) */
  details?: string[];
  
  /** Código de estado HTTP */
  status: number;
}

/**
 * Interfaz para el estado de autenticación en la aplicación
 * 
 * @interface AuthState
 */
export interface AuthState {
  /** Indica si el usuario está autenticado */
  isAuthenticated: boolean;
  
  /** Usuario actual (null si no está autenticado) */
  currentUser: User | null;
  
  /** Token actual (null si no está autenticado) */
  token: string | null;
  
  /** Indica si se está cargando alguna operación de auth */
  loading: boolean;
  
  /** Último error ocurrido */
  error: string | null;
}