import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {}

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

  verifyEmail(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verify-email?token=${token}`).pipe(
      catchError(error => {
        let errorMessage = 'Error desconocido';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        console.error('Verify email error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

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

  loginWithDiscord(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/discord`, { token }).pipe(
      tap(response => {
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
