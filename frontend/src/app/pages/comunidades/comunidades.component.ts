import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faArrowLeft, faPeopleGroup, faPen, faBars, faAward, faPlus, faUser ,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [
    SearchComponent,
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
  faBars = faBars
  faAward = faAward
  faArrowRight = faArrowRight 
  faArrowLeft  =faArrowLeft  
  faUser = faUser
  faPlus = faPlus
}
