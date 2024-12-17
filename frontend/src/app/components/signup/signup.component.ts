import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service'; // Importamos el servicio de países

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corregido el nombre del archivo CSS
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  countries: string[] = []; // Lista de países que se llenará desde la API
  avatar: string | ArrayBuffer | null = null; // Para mostrar la imagen previa seleccionada

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private countryService: CountryService // Inyectamos el servicio de países
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
    // Llama al servicio para obtener la lista de países
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data.map((country: any) => country.name.common); // Extraemos el nombre de los países
      },
      (error) => {
        console.error('Error al obtener países:', error);
        alert('No se pudieron cargar los países.');
      }
    );
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
  onSignup() {
    if (this.signupForm.valid) {
      const formData = new FormData();
      const { name, lastname, username, email, password, repeatPassword, dateBirth, country, acceptTerms, isOver14, acceptPrivacyPolicy } = this.signupForm.value;
  
      formData.append('name', name);
      formData.append('lastname', lastname);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('repeatPassword', repeatPassword);
      formData.append('dateBirth', dateBirth);
      formData.append('country', country);
      formData.append('acceptTerms', acceptTerms);
      formData.append('isOver14', isOver14);
      formData.append('acceptPrivacyPolicy', acceptPrivacyPolicy);
  
      // Obtener el archivo de la forma correcta
      const avatarFile = this.signupForm.get('avatar')?.value;
      if (avatarFile && avatarFile instanceof File) {
        formData.append('avatar', avatarFile, avatarFile.name); // Asegurarse de que sea un archivo válido
      }
  
      this.authService.register(formData).subscribe(
        (response) => {
          alert('Registro exitoso. Verifica tu correo electrónico.');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
          alert(error.error?.message || 'Error al registrar el usuario.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }  
}