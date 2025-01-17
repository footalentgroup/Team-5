import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamsTwoComponent } from '../teams-two/teams-two.component';
// Importaciones de los iconos de font Awesome
import { faAddressCard, faUserPlus, faArrowDown, faPen, faCrown,faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teams-three',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, TeamsTwoComponent],
  templateUrl: './teams-three.component.html',
  styleUrl: './teams-three.component.css'
})
export class TeamsThreeComponent {
  // "variables" para iconos 
  faAddressCard = faAddressCard
  faUserPlus = faUserPlus
  faArrowDown = faArrowDown 
  faPen = faPen
  faCrown = faCrown
  faArrowUp = faArrowUp 
}
