import { Component } from '@angular/core'; 
import { Router, RouterModule } from '@angular/router'; // Se importa Router para poder redirigir entre rutas y RouterModule para manejar rutas en la aplicación.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Se importan las clases y módulos necesarios para crear formularios reactivos en Angular.
import { AuthService } from '../../services/auth.service'; // Se importa el servicio de autenticación para manejar las peticiones de login.

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [Router, RouterModule],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent {

}
