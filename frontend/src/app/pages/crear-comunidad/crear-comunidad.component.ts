import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressCard, faUserPlus, faArrowDown, faPen,faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crear-comunidad',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './crear-comunidad.component.html',
  styleUrl: './crear-comunidad.component.css'
})
export class CrearComunidadComponent {
  faAddressCard = faAddressCard
  faUserPlus = faUserPlus
  faArrowDown = faArrowDown 
  faPen = faPen
  faArrowUp = faArrowUp 
  faPlus = faPlus
}
