// Importación de módulos y servicios necesarios para el componente.
import { Component, OnInit } from '@angular/core'; // Importamos el decorador Component y el ciclo de vida OnInit.
import { Router, RouterLink } from '@angular/router'; // Importamos los servicios de navegación de Angular.
import { AuthService } from '../../services/auth.service'; // Servicio para manejar la autenticación y la actualización del perfil.
import { CloudinaryService } from '../../services/cloudinary.service'; // Servicio para subir imágenes a Cloudinary.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Herramientas para manejar formularios reactivos.
import { CountryService } from '../../services/country.service'; // Servicio para obtener la lista de países.
import { CommonModule } from '@angular/common'; // Módulo común de Angular para usar directivas comunes como ngIf, ngFor.

@Component({
  selector: 'app-edit-profile', 
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule], // Importamos módulos necesarios para las funcionalidades del componente.
  templateUrl: './edit-profile.component.html', 
  styleUrls: ['./edit-profile.component.css'] 
})
export class EditProfileComponent implements OnInit { 
  // Definición de variables que almacenarán el formulario, mensajes de éxito y error, y la vista previa del avatar.
  editProfileForm: FormGroup; // Variable para almacenar el formulario reactivo.
  successMessage: string | null = null; // Mensaje de éxito que se mostrará si la actualización es exitosa.
  errorMessage: string | null = null; // Mensaje de error que se mostrará si ocurre un problema.
  avatarFile: File | null = null; // Archivo del avatar seleccionado por el usuario.
  avatarPreview: string | null = null; // Vista previa del avatar cargado en formato base64.

  // Lista de países que se obtendrá del servicio para llenar el campo de selección en el formulario.
  countries: string[] = []; 

  // Constructor: Se inyectan los servicios y herramientas necesarios para este componente.
  constructor(
    private fb: FormBuilder, // FormBuilder es usado para construir el formulario reactivo.
    private authService: AuthService, // Servicio para manejar la autenticación.
    private cloudinaryService: CloudinaryService, // Servicio para manejar la subida de imágenes a Cloudinary.
    private countryService: CountryService, // Servicio para obtener la lista de países.
    private router: Router // Para manejar la navegación entre vistas en la aplicación.
  ) {
    // Inicializamos el formulario reactivo con las validaciones correspondientes.
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required], // Campo obligatorio para el nombre del usuario.
      lastname: ['', Validators.required], // Campo obligatorio para el apellido.
      username: ['', Validators.required], // Campo obligatorio para el nombre de usuario.
      country: [''], // Campo opcional para el país.
      dateBirth: ['', Validators.required], // Campo obligatorio para la fecha de nacimiento.
      password: [''], // Campo opcional para la nueva contraseña.
    });
  }

  // ngOnInit: Este método se ejecuta cuando el componente se inicializa. Aquí cargamos la lista de países.
  ngOnInit(): void {
    this.loadCountries(); // Llamamos al método para cargar los países desde la API.
  }

  // Método para cargar la lista de países desde el servicio CountryService.
  loadCountries(): void {
    // Llamamos al método getCountries() que hace una solicitud HTTP al backend para obtener los países.
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        // Al recibir la lista de países, extraemos solo el nombre común de cada país y lo almacenamos en la variable `countries`.
        this.countries = countries.map((country) => country.name.common);
      },
      error: (err) => {
        // Si hay un error al obtener los países, mostramos un mensaje de error.
        this.errorMessage = 'Error al cargar los países.';
        console.error(err);
      },
    });
  }

  // Método que se ejecuta cuando el usuario selecciona un archivo de imagen (avatar).
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Tomamos el primer archivo seleccionado por el usuario.

    if (file) {
      // Si el archivo existe, almacenamos la referencia del archivo en `avatarFile`.
      this.avatarFile = file;

      // Creamos una vista previa del avatar utilizando FileReader para convertir la imagen a base64.
      const reader = new FileReader();
      reader.onload = () => {
        // Una vez cargada la imagen, asignamos la vista previa a la variable `avatarPreview`.
        this.avatarPreview = reader.result as string;
      };

      // Leemos el archivo como una URL de datos en formato base64.
      reader.readAsDataURL(file);
    }
  }

  // Método que se ejecuta al enviar el formulario de actualización de perfil.
  async onSubmit(): Promise<void> {
    // Validamos que el formulario sea válido antes de proceder.
    if (this.editProfileForm.invalid) {
      // Si el formulario es inválido, mostramos un mensaje de error.
      this.errorMessage = 'Por favor, llena los campos obligatorios.';
      return;
    }

    // Creamos un objeto FormData para enviar los datos del formulario, incluyendo el avatar.
    const formData = new FormData();
    const token = localStorage.getItem('token'); // Recuperamos el token de autenticación del almacenamiento local.

    if (!token) {
      // Si no se encuentra el token, mostramos un mensaje de error.
      this.errorMessage = 'No se encontró el token de autenticación.';
      return;
    }

    try {
      // Si el usuario ha seleccionado un avatar, lo subimos a Cloudinary.
      if (this.avatarFile) {
        const avatarUrl = await this.cloudinaryService.uploadAvatar(this.avatarFile); // Subimos la imagen y obtenemos la URL.
        formData.append('avatar', avatarUrl); // Añadimos la URL del avatar al FormData.
      }

      // Agregamos el resto de los datos del formulario al FormData.
      Object.entries(this.editProfileForm.value).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string); // Solo agregamos los campos con valor.
        }
      });

      // Llamamos al servicio de autenticación para actualizar el perfil del usuario en el backend.
      this.authService.updateUserProfile(token, formData).subscribe({
        next: (response) => {
          // Si la actualización es exitosa, mostramos un mensaje de éxito.
          this.successMessage = 'Perfil actualizado exitosamente.';
          this.errorMessage = null;

          // Después de 2 segundos, redirigimos al perfil del usuario.
          setTimeout(() => this.router.navigate(['/user-profile']), 2000);
        },
        error: (error) => {
          // Si ocurre un error al actualizar el perfil, mostramos un mensaje de error.
          this.errorMessage = error.error?.message || 'Ocurrió un error al actualizar el perfil.';
          this.successMessage = null;
        },
      });
    } catch (error: any) {
      // Si ocurre un error durante la subida del avatar, mostramos un mensaje de error.
      this.errorMessage = error.message || 'Ocurrió un error al procesar el avatar.';
    }
  }
}
