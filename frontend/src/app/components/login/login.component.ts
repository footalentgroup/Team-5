import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Navbar2Component } from '../navbar2/navbar2.component';

/**
 * Componente para el inicio de sesión de los usuarios.
 * Gestiona el formulario de inicio de sesión y la lógica asociada, como la validación y autenticación del usuario.
 */
@Component({
  selector: 'app-login',
  standalone: true, // Se establece como un componente independiente
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Navbar2Component], // Se importan módulos comunes y de formularios reactivos
  templateUrl: './login.component.html', // Plantilla HTML asociada al componente
  styleUrl: './login.component.css' // Estilos CSS asociados al componente
})
export class LoginComponent {
  // Formulario reactivo que contiene los campos de usuario y contraseña.
  loginForm: FormGroup;
  
  // Mensaje de error que se mostrará al usuario en caso de que ocurra un error durante el inicio de sesión.
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, // Inyección de FormBuilder para crear y gestionar formularios reactivos
    private authService: AuthService, // Inyección del servicio de autenticación para realizar las solicitudes de login
    private router: Router // Inyección del servicio de enrutamiento para redirigir al usuario después de un inicio de sesión exitoso
  ) {
    // Inicialización del formulario reactivo con validadores requeridos para los campos 'username' y 'password'
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // El campo de nombre de usuario es obligatorio
      password: ['', [Validators.required]], // El campo de contraseña es obligatorio
    });
  }

  /**
   * Método que se ejecuta cuando el usuario intenta iniciar sesión.
   * Realiza la validación del formulario y llama al servicio de autenticación para verificar las credenciales del usuario.
   */
  onLogin() {
    if (this.loginForm.invalid) return; // Si el formulario es inválido, se evita realizar la solicitud de login.
  
    const { username, password } = this.loginForm.value; // Extrae los valores del formulario
  
    // Llama al servicio de autenticación para hacer la solicitud de inicio de sesión
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response); // Imprime la respuesta para verificar su estructura
  
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Guarda el token en localStorage para mantener la sesión activa
          this.router.navigate(['/dashboard']); // Redirige al usuario a la página del dashboard
        } else {
          console.error('Error: No se ha recibido un token.');
          this.errorMessage = 'Error al recibir el token. Por favor, inténtalo de nuevo.'; // Muestra mensaje de error si no se recibe el token
        }
      },
      error: (err) => {
        console.error('Error de inicio de sesión:', err); // Muestra el error en la consola para depuración
        this.errorMessage = err.error?.message || 'Error al iniciar sesión'; // Muestra el mensaje de error si existe
      },
    });
  }

  /**
   * Método que maneja el inicio de sesión utilizando la autenticación de Discord.
   * Redirige al usuario al endpoint de autenticación de Discord.
   */
  onDiscordLogin() {
    // Redirige al usuario a la URL de autenticación de Discord
    window.location.href = 'https://respawn-events-t5.vercel.app/api/auth/discord';
  }

  /**
   * Método para limpiar el valor de un campo de texto específico en el formulario de inicio de sesión.
   * 
   * @param field Nombre del campo cuyo valor se desea limpiar.
   */
  clearInput(field: string): void {
    const control = this.loginForm.get(field); // Obtiene el control del formulario correspondiente al campo
    if (control) {
      control.setValue(''); // Limpia el valor del campo
    }
  }
}
