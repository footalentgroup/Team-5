import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importación de módulos para formularios reactivos y validación
import { Router, RouterLink } from '@angular/router'; // Importación de Router y RouterLink para navegación
import { UserService } from '../../services/user.service'; // Servicio para manejar datos de usuario
import { AuthService } from '../../services/auth.service'; // Servicio para la autenticación del usuario
import { CommonModule } from '@angular/common'; // Módulo común para componentes básicos
import { CountryService } from '../../services/country.service'; // Servicio para obtener los países
import { CloudinaryService } from '../../services/cloudinary.service'; // Servicio para manejar la carga de imágenes en Cloudinary
import { Navbar2Component } from '../navbar2/navbar2.component';

@Component({
  selector: 'app-signup', // Definición del selector para usar el componente en la vista
  standalone: true, // Indicamos que este componente es autónomo (no necesita otros módulos para funcionar)
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar2Component], // Importación de módulos que este componente utiliza
  templateUrl: './signup.component.html', // Archivo HTML asociado al componente
  styleUrls: ['./signup.component.css'] // Estilos CSS asociados al componente
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup; // Formulario reactivo para la captura de los datos del usuario
  loading = true; // Indicador para mostrar un estado de carga mientras se obtiene la información de los países
  countries: string[] = []; // Lista para almacenar los países obtenidos desde el servicio
  avatar: string | ArrayBuffer | null = null; // Variable para almacenar la imagen del avatar seleccionada por el usuario

  // Inyección de dependencias para los servicios necesarios
  constructor(
    private fb: FormBuilder, // Servicio para construir el formulario reactivo
    private userService: UserService, // Servicio para gestionar los datos del usuario
    private authService: AuthService, // Servicio para manejar la autenticación
    private router: Router, // Servicio para la navegación entre rutas
    private countryService: CountryService, // Servicio para obtener la lista de países
    private cloudinaryService: CloudinaryService // Servicio para manejar la subida de imágenes a Cloudinary
  ) {
    // Inicialización del formulario reactivo con los campos requeridos y sus validaciones
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Nombre requerido
      lastname: ['', [Validators.required]], // Apellido requerido
      username: ['', [Validators.required]], // Nombre de usuario requerido
      email: ['', [Validators.required, Validators.email]], // Email requerido y validación de formato
      password: ['', [Validators.required, Validators.minLength(8)]], // Contraseña requerida con mínimo 8 caracteres
      repeatPassword: ['', [Validators.required]], // Confirmación de la contraseña requerida
      dateBirth: ['', [Validators.required]], // Fecha de nacimiento requerida
      country: ['', [Validators.required]], // País requerido
      acceptTerms: [false, [Validators.requiredTrue]], // Aceptación de términos, requerido como verdadero
      isOver14: [false, [Validators.requiredTrue]], // Aceptación de ser mayor de 14 años, requerido como verdadero
      acceptPrivacyPolicy: [false, [Validators.requiredTrue]], // Aceptación de la política de privacidad, requerido como verdadero
      avatar: [null]  // Campo para almacenar el archivo del avatar
    }, { validators: this.passwordMatchValidator }); // Validador para comprobar que las contraseñas coinciden
  }

  ngOnInit() {
    // Método que se ejecuta cuando el componente se inicializa
    this.loading = true; // Indicador de carga activado mientras se obtienen los países

    // Llamada al servicio para obtener los países
    this.countryService.getCountries().subscribe({
      next: (data) => {
        // Verifica si los datos de países se han obtenido correctamente
        if (data && Array.isArray(data)) {
          this.countries = data.map((country: any) => country.name.common); // Mapea los países al formato adecuado
        } else {
          console.error('Respuesta inesperada:', data); // Error si la respuesta no es la esperada
          alert('Error al procesar los datos de países.');
        }
        this.loading = false; // Desactiva el indicador de carga
      },
      error: (error) => {
        // Maneja errores si no se pueden obtener los países
        console.error('Error al obtener países:', error);
        alert('No se pudieron cargar los países. Intenta nuevamente.');
        this.loading = false; // Desactiva el indicador de carga en caso de error
      },
    });
  }

  // Método que maneja el evento de cambio de archivo (cuando el usuario selecciona una imagen de avatar)
  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      this.avatar = URL.createObjectURL(file); // Crea una URL temporal para mostrar la imagen previa
    }
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatPassword')?.value
      ? null : { mismatch: true }; // Si las contraseñas no coinciden, devuelve un error
  }

  // Método que maneja el evento de envío del formulario de registro
  async onSignup() {
    if (this.signupForm.valid) { // Verifica si el formulario es válido
      try {
        const avatarFile = this.signupForm.get('avatar')?.value;
        let avatarUrl = '';

        // Si hay un archivo de avatar, se sube a Cloudinary
        if (avatarFile) {
          avatarUrl = await this.cloudinaryService.uploadAvatar(avatarFile); // Sube el archivo de avatar
        }

        const userData = {
          ...this.signupForm.value,
          avatar: avatarUrl // Incluye la URL del avatar subido en los datos del usuario
        };

        const userEmail = this.signupForm.get('email')?.value;
        this.userService.setUserEmail(userEmail); // Guarda el correo electrónico en el servicio

        // Llama al servicio de autenticación para registrar el usuario
        this.authService.register(userData).subscribe(
          () => {
            this.userService.setUserEmail(userData.email); // Guarda el email después del registro
            this.router.navigate(['/confirm-signup']); // Redirige al usuario a la página de confirmación
          },
          (error) => {
            console.error('Error en el registro:', error); // Manejo de errores durante el registro
            alert(error?.error?.message || 'Error al registrar el usuario.');
          }
        );
      } catch (error) {
        // Manejo de errores durante el proceso de registro
        if (error instanceof Error) {
          alert(error.message || 'Error al subir el avatar.');
        } else {
          alert('Error desconocido.');
        }
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.'); // Si el formulario no es válido, muestra un mensaje de error
    }
  }

  // Método para manejar el inicio de sesión con Discord
  onDiscordLogin() {
    // Redirige a la URL de autenticación de Discord
    window.location.href = 'http://localhost:3000/api/auth/discord';
  }
}
