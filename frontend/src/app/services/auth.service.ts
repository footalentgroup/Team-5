// Importamos las dependencias necesarias
import { Injectable } from '@angular/core'; // Decorador que indica que esta clase es un servicio
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Para realizar peticiones HTTP
import { Observable } from 'rxjs'; // Para trabajar con flujos de datos asíncronos

// Decorador @Injectable con providedIn: 'root' indica que este servicio es global y se inyectará en cualquier componente que lo necesite
@Injectable({
  providedIn: 'root', // Proporciona el servicio a nivel de toda la aplicación
})
export class AuthService {
  // Definimos la URL base para la API de autenticación
  private apiUrl = 'https://footg-t5.vercel.app/api/users'; // Endpoint para todas las operaciones de usuario

  // El constructor inyecta el servicio HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Método para iniciar sesión con nombre de usuario y contraseña
  // Este método hace una petición POST a la API con las credenciales del usuario
  login(username: string, password: string): Observable<any> {
    // Realiza la petición POST a la ruta /login de la API con las credenciales
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  // Método para obtener la información del usuario autenticado
  // Se pasa un token JWT en el encabezado Authorization para validar al usuario
  getUserInfo(token: string): Observable<any> {
    // Realiza una solicitud GET a la ruta /user de la API, pasando el token de autorización en el encabezado
    return this.http.get<any>(`${this.apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }, // Se incluye el token JWT en los headers
    });
  }

  // Método para verificar el email del usuario mediante un token
  // Este método se usa generalmente después de un registro, para confirmar el email del usuario
  verifyEmail(token: string): Observable<any> {
    // Realiza una solicitud GET a la ruta /verify-email de la API, pasando el token como query string
    return this.http.get<any>(`${this.apiUrl}/verify-email?token=${token}`);
  }

  // Método para registrar un nuevo usuario
  // Este método usa FormData para enviar datos del formulario (por ejemplo, imágenes, campos de texto, etc.)
  register(userData: FormData): Observable<any> {
    // Realiza una solicitud POST a la ruta /register de la API para registrar al nuevo usuario
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Método para actualizar la información del perfil del usuario
  // Se pasa el token JWT en los headers para autorizar la solicitud de actualización
  updateUserProfile(token: string, updateData: FormData): Observable<any> {
    // Se configura el encabezado Authorization con el token para validar la solicitud
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // El token JWT se incluye en los encabezados
    });

    // Realiza una solicitud PUT a la ruta /update de la API con los datos de actualización
    return this.http.put(`${this.apiUrl}/update`, updateData, { headers });
  }

  // Método para iniciar sesión con Discord
  // Este método guarda el token recibido en el almacenamiento local del navegador
  loginWithDiscord(token: string): void {
    // Guarda el token recibido en localStorage para su uso posterior (por ejemplo, mantener la sesión abierta)
    localStorage.setItem('token', token); // Guardamos el token en el localStorage
  }
}
