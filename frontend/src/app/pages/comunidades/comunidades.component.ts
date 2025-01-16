import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule, 
    RouterLink
  ],
  templateUrl: './comunidades.component.html',
  styleUrl: './comunidades.component.css'
})
export class ComunidadesComponent {
  faPeopleGroup = faPeopleGroup
  faPen = faPen
  faAddressCard = faAddressCard
}
