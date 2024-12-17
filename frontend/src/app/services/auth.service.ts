import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // URL base de la API para autenticación

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión con usuario y contraseña
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Método para obtener la información del usuario autenticado usando un token
  getUserInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }, // Enviar el token en el encabezado
    });
  }

  // Método para verificar el email del usuario mediante un token de verificación
  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify-email?token=${token}`);
  }

  // Método para registrar un nuevo usuario
  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para manejar la autenticación con Discord
  loginWithDiscord(token: string): void {
    localStorage.setItem('token', token); // Guardar el token recibido en localStorage
  }
}
