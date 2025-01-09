import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {
  userInfo: any; // Para almacenar la información del usuario
  loading: boolean = true; // Indicador de carga

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Primero, intentamos obtener el token de localStorage
    let token = localStorage.getItem('token');

    // Si no hay token en localStorage, intentamos obtenerlo de los parámetros de la URL
    if (!token) {
      this.route.queryParams.subscribe(params => {
        token = params['token'];  // Obtenemos el token de la URL

        if (token) {
          // Si existe el token, lo guardamos en el localStorage
          localStorage.setItem('token', token);
        } else {
          // Si no hay token, redirigimos al login
          console.log("No hay token en la URL, redirigiendo al login...");
          this.router.navigate(['/login']);
          return; // Salimos del método
        }
      });
    }

    // Ahora que tenemos el token, obtenemos la información del usuario
    if (token) {
      this.authService.getUserInfo(token).subscribe({
        next: (userInfo) => {
          this.userInfo = userInfo; // Almacena la información del usuario
          this.loading = false; // Cambia el estado de carga
        },
        error: (err) => {
          console.error('Error al obtener la información del usuario:', err);
          this.router.navigate(['/login']); // Redirige al login si hay un error
        }
      });
    }
  }
  
  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Elimina el token de autenticación del almacenamiento local
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}