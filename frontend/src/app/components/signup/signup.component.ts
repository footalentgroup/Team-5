import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = true;
  countries: string[] = [];
  avatar: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private countryService: CountryService, // Inyectamos el servicio de países
    private cloudinaryService: CloudinaryService // Inyectamos el servicio de Cloudinary
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      country: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      isOver14: [false, [Validators.requiredTrue]],
      acceptPrivacyPolicy: [false, [Validators.requiredTrue]],
      avatar: [null]  // Campo para almacenar la imagen (file)
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Inicia el indicador de carga
    this.loading = true;
  
    // Llama al servicio para obtener los países
    this.countryService.getCountries().subscribe({
      next: (data) => {
        // Verifica que la respuesta sea válida
        if (data && Array.isArray(data)) {
          this.countries = data.map((country: any) => country.name.common);
        } else {
          console.error('Respuesta inesperada:', data);
          alert('Error al procesar los datos de países.');
        }
        this.loading = false; // Desactiva el indicador de carga
      },
      error: (error) => {
        // Maneja el error y desactiva el indicador de carga
        console.error('Error al obtener países:', error);
        alert('No se pudieron cargar los países. Intenta nuevamente.');
        this.loading = false;
      },
    });
  }

  // Maneja el evento de cambio de archivo (cuando el usuario selecciona una imagen)
  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      this.avatar = URL.createObjectURL(file); // Mostrar la imagen previa
    }
  }

  // Validador personalizado para verificar coincidencia de contraseñas
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatPassword')?.value
      ? null : { mismatch: true };
  }

  // Método para generar las iniciales del usuario a partir del nombre y apellido
  getInitials(): string {
    const name = this.signupForm.get('name')?.value || '';  // Obtener el nombre
    const lastname = this.signupForm.get('lastname')?.value || ''; // Obtener el apellido

    // Obtener las primeras letras del nombre y apellido
    const initials = (name.charAt(0) + lastname.charAt(0)).toUpperCase();
    return initials;
  }

  // Método para manejar el evento de envío del formulario de registro.
  async onSignup() {
    if (this.signupForm.valid) {
      try {
        const avatarFile = this.signupForm.get('avatar')?.value;
        let avatarUrl = '';

        // Subir el avatar si existe
        if (avatarFile) {
          avatarUrl = await this.cloudinaryService.uploadAvatar(avatarFile);
        }

        const userData = {
          ...this.signupForm.value,
          avatar: avatarUrl // Guardamos la URL del avatar
        };

        this.authService.register(userData).subscribe(
          () => {
            alert('Registro exitoso. Verifica tu correo.');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error en el registro:', error);
            alert(error?.error?.message || 'Error al registrar el usuario.');
          }
        );
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message || 'Error al subir el avatar.');
        } else {
          alert('Error desconocido.');
        }
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Método para manejar el inicio de sesión con Discord
  onDiscordLogin() {
    // Redirigir a la URL de autenticación de Discord
    window.location.href = 'https://footg-t5.vercel.app/api/auth/discord';
  }
}
