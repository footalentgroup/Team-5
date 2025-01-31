import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, 
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.currentUser.subscribe((user) => {
      if (user && user.username) {
        this.username = user.username; // Mostrar el nombre de usuario
      } else {
        this.username = null; // Mostrar "Bienvenido/a"
      }
    });
  }

  logout(): void {
    this.authService.logout(); // Cerrar sesión
  }
}
