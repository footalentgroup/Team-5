import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-dashboard',  
  standalone: true,  
  imports: [RouterLink, SearchComponent],  
  templateUrl: './dashboard.component.html',  
  styleUrl: './dashboard.component.css'  
})
export class DashboardComponent implements OnInit {

  token: string | null = null;  // Variable para almacenar el token de autenticación (o null si no se encuentra)

  constructor(private router: Router) {}  // Inyección de dependencias para usar el enrutador de Angular

  ngOnInit(): void {
    // Este método se ejecuta cuando el componente es inicializado
    // Obtener el token desde localStorage, que se utilizó para la autenticación
    this.token = localStorage.getItem('token');

    // Verificar si se encuentra el token
    if (this.token) {
      console.log('Token encontrado:', this.token);  // Si el token está presente, se muestra en consola
      alert('¡Autenticación exitosa!');  // Mensaje de éxito de autenticación
    } else {
      alert('No se recibió ningún token. Redirigiendo...');  // Si no se encuentra el token, se muestra un mensaje
      this.router.navigate(['/login']);  // Redirige a la página de login si no hay token
    }
  }
}
