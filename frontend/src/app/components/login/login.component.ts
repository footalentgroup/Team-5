import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Se importa Router para poder redirigir entre rutas y RouterModule para manejar rutas en la aplicación.
import { CommonModule } from '@angular/common'; // Se importa CommonModule, que proporciona funcionalidades comunes para los módulos.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Se importan las clases y módulos necesarios para crear formularios reactivos en Angular.
import { AuthService } from '../../services/auth.service'; // Se importa el servicio de autenticación para manejar las peticiones de login.

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario reactivo para el inicio de sesión
  errorMessage: string | null = null; // Mensaje de error para mostrar al usuario

  constructor(
    private fb: FormBuilder, // Inyección de FormBuilder para crear formularios reactivos
    private authService: AuthService, // Inyección del servicio de autenticación
    private router: Router // Inyección del router para la navegación
  ) {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Campo de nombre de usuario requerido
      password: ['', [Validators.required]], // Campo de contraseña requerido
    });
  }

  // Método que maneja el evento de inicio de sesión
  onLogin() {
    if (this.loginForm.invalid) return; // Si el formulario es inválido, no se realiza la solicitud

    const { username, password } = this.loginForm.value; // Extraer valores del formulario

    // Llamada al servicio de autenticación para realizar la solicitud de inicio de sesión
    this.authService.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Guardar el token en localStorage
        this.router.navigate(['/dashboard']); // Redirigir al usuario al dashboard
      },
      error: (err) => {
        // Manejo de errores: mostrar mensaje de error
        console.error('Error de inicio de sesión:', err);
        this.errorMessage = err.error.message || 'Error al iniciar sesión';
      },
    });
  }

  // Método para manejar el inicio de sesión con Discord
  onDiscordLogin() {
    // Redirigir a la URL de autenticación de Discord
    window.location.href = 'https://ftg-team5.vercel.app/api/auth/discord';
  }
}