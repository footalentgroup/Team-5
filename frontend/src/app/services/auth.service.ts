import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, tap } from 'rxjs';

/**
 * Servicio de autenticación de usuarios que maneja las operaciones relacionadas
 * con el inicio de sesión, registro, verificación de correo, actualización de perfil,
 * y autenticación con Discord.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL base para interactuar con la API de usuarios.
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

  /**
   * Método para iniciar sesión de un usuario con nombre de usuario y contraseña.
   * Realiza una solicitud POST a la API y maneja posibles errores.
   * 
   * @param username Nombre de usuario.
   * @param password Contraseña del usuario.
   * @returns Observable que emite la respuesta de la API.
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';

        // Verifica si el backend devuelve un mensaje de error
        if (error.error && error.error.message) {
          errorMessage = error.error.message; // Extrae el mensaje de error
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar al servidor';
        }

        console.error('Login error:', error); // Loguear el error para depuración
        return throwError(() => new Error(errorMessage)); // Retorna el mensaje de error
      })
    );
  }

  /**
   * Método para obtener la información del usuario autenticado utilizando un token JWT.
   * 
   * @param token Token JWT para la autenticación.
   * @returns Observable que emite la información del usuario.
   */
  getUserInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.error('Get user info error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Método para verificar el correo electrónico de un usuario utilizando un token.
   * 
   * @param token Token JWT de verificación.
   * @returns Observable con el resultado de la verificación.
   */
  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify-email?token=${token}`).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';
        
        // Si hay un error en la respuesta, se muestra el mensaje adecuado
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } 
        // Si el error es un problema de red o de conexión, manejarlo
        else if (error.status === 0) {
          errorMessage = 'No se puede conectar al servidor. Verifica tu conexión a Internet.';
        }
        // Si el error no es conocido, muestra un mensaje genérico
        else if (error.status === 404) {
          errorMessage = 'La URL de verificación no es válida.';
        }

        console.error('Verify email error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Método para registrar un nuevo usuario. Envía los datos del usuario al backend.
   * 
   * @param userData Datos del usuario que se enviarán en la solicitud.
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.error('Register error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Método para actualizar el perfil del usuario autenticado. Se envían los nuevos datos y el token JWT.
   * 
   * @param token Token JWT del usuario autenticado.
   * @param updateData Datos actualizados del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  updateUserProfile(token: string, updateData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/update`, updateData, { headers }).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.error('Update user profile error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Método para iniciar sesión utilizando la autenticación con Discord.
   * 
   * @param token Token JWT de Discord.
   * @returns Observable con la respuesta de la autenticación.
   */
  loginWithDiscord(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/discord`, { token }).pipe(
      tap(response => {
        // Guardar el token en el almacenamiento local para su uso posterior.
        localStorage.setItem('token', response.token);
      }),
      catchError(error => {
        let errorMessage = 'Error desconocido';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.error('Discord login error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
